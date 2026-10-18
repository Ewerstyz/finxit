import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "node:fs/promises";
import path from "node:path";

const reduced = process.argv.includes("--reduced");
const report = [];
const client = new Client({
  name: "finxi-demo-sequence-review",
  version: "1.0.0",
});
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [
    path.resolve(
      "node_modules/chrome-devtools-mcp/build/src/bin/chrome-devtools-mcp.js",
    ),
    "--headless",
    "--isolated",
    "--no-usage-statistics",
    "--no-performance-crux",
    "--no-page-id-routing",
    `--workspace=${process.cwd()}`,
    ...(reduced ? ["--chromeArg=--force-prefers-reduced-motion"] : []),
  ],
  stderr: "pipe",
});
async function call(name, args = {}) {
  const result = await client.callTool({ name, arguments: args });
  report.push({ name, args, result });
  if (result.isError) throw Error(JSON.stringify(result));
  return result;
}
const ev = (fn) => call("evaluate_script", { function: fn });
async function clickTab(name) {
  const snapshot = await call("take_snapshot");
  const content = snapshot.content
    .filter((x) => x.type === "text")
    .map((x) => x.text)
    .join("\n");
  const match = content.match(new RegExp(`uid=(\\S+)\\s+tab "${name}"`));
  if (!match) throw Error(`Tab missing in snapshot: ${name}`);
  await call("click", { uid: match[1] });
}
const wait = "await new Promise(r=>setTimeout(r,1000));";
const check = `const tab=document.querySelector('.demo-selector [data-state="active"]');
  const panel=document.querySelector('.demo-tabs [role="tabpanel"][data-state="active"]');
  if(tab.textContent.trim()!==name||!panel.querySelector('video')?.currentSrc.endsWith('/media/'+file+'.mp4'))throw Error('Wrong stage '+name);
  const video=panel.querySelector('video');
  if(!video.paused||video.autoplay||video.loop)throw Error('Film must remain paused');
  const end=video.duration-.05,wanted=start+local*(end-start);
  if(Math.abs(video.currentTime-wanted)>.15)throw Error('Seek mismatch '+JSON.stringify({name,time:video.currentTime,wanted,duration:video.duration}));
  if(document.documentElement.scrollWidth>innerWidth)throw Error('Overflow');
  const selector=document.querySelector('.demo-selector').getBoundingClientRect(),copy=panel.querySelector('.demo-copy').getBoundingClientRect(),film=panel.querySelector('.scene-film').getBoundingClientRect();
  if(selector.top<75||copy.top<selector.bottom||film.height<100||film.bottom>innerHeight-45)throw Error('Stage collision '+JSON.stringify({selector,copy,film}));
  return {stage:name,time:video.currentTime,wanted,paused:video.paused,filmHeight:film.height};`;
const films = [
  ["Organize", "finxi-plan-organize", 0.05],
  ["Entenda", "finxi-plan-entenda", 0.05],
  ["Converse", "finxi-plan-converse", 0.05],
];
try {
  await client.connect(transport);
  await call("new_page", {
    url: "http://127.0.0.1:4173/?version=demo-sequence",
    timeout: 20000,
  });
  for (const viewport of reduced
    ? ["390x844x1"]
    : ["1440x1000x1", "390x844x1", "320x740x1"]) {
    await call("emulate", { viewport });
    await ev(
      `async()=>{document.getElementById('demo-sequence').scrollIntoView({behavior:'instant',block:'start'});${wait}await document.fonts.ready;return {height:document.getElementById('demo-sequence').offsetHeight};}`,
    );
    if (reduced) {
      await ev(
        `()=>{const e=document.getElementById('demo-sequence');if(!e.classList.contains('scene-static')||e.querySelector('video'))throw Error('Reduced motion');return {static:true};}`,
      );
      for (const [name] of films) {
        await clickTab(name);
        await ev(
          `async()=>{await new Promise(r=>setTimeout(r,100));const panel=document.querySelector('.demo-tabs [data-state="active"][role="tabpanel"]');if(document.querySelector('.demo-selector [data-state="active"]').textContent.trim()!=='${name}'||!panel?.querySelector('h3')||!panel.querySelector('.scene-film img')?.naturalWidth||document.documentElement.scrollWidth>innerWidth)throw Error('Static navigation');return {stage:'${name}',static:true};}`,
        );
      }
      await call("take_screenshot", {
        filePath: "design/qa/demo-sequence-reduced.png",
      });
      continue;
    }
    for (const [p, index, local] of [
      [0, 0, 0],
      [0.3, 0, 0.9 / 0.95],
      [0.327, 0, 1],
      [0.334, 1, 0.002 / 0.95],
      [0.5, 1, 0.5 / 0.95],
      [0.66, 1, 1],
      [0.667, 2, 0.001 / 0.95],
      [0.99, 2, 1],
      [1, 2, 1],
      [0.5, 1, 0.5 / 0.95],
      [0.15, 0, 0.45 / 0.95],
    ]) {
      const [name, file, start] = films[index];
      await ev(
        `async()=>{const e=document.getElementById('demo-sequence');scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*${p},behavior:'instant'});${wait}const name='${name}',file='${file}',start=${start},local=${local};${check}}`,
      );
      if ([0.3, 0.5, 0.99].includes(p))
        await call("take_screenshot", {
          filePath: `design/qa/demo-sequence-${name}-${viewport}.png`,
        });
    }
    for (const index of [2, 0, 1]) {
      const [name, file, start] = films[index];
      await clickTab(name);
      await ev(
        `async()=>{${wait}const name='${name}',file='${file}',start=${start},local=0;${check}}`,
      );
    }
    await ev(
      `async()=>{const controlPanel=document.querySelector('.demo-tabs [role="tabpanel"][data-state="active"]');[...controlPanel.querySelectorAll('.scene-controls button')].find(x=>x.textContent.includes('Converse')).click();${wait}const name='Converse',file='finxi-plan-converse',start=.05,local=0;${check}}`,
    );
    await ev(
      `async()=>{const e=document.getElementById('demo-sequence');scrollTo({top:e.getBoundingClientRect().top+scrollY+e.offsetHeight,behavior:'instant'});${wait}if(document.querySelector('.demo-sequence-stage').getBoundingClientRect().bottom>1||document.getElementById('recursos').getBoundingClientRect().top>innerHeight)throw Error('Page continuation blocked');return {continuesToFeatures:true};}`,
    );
  }
  if (!reduced) {
    await call("new_page", {
      url: "http://127.0.0.1:4173/?demo=conversar",
      timeout: 20000,
    });
    await ev(
      `async()=>{${wait}const name='Converse',file='finxi-plan-converse',start=.05,local=0;${check}}`,
    );
    await call("emulate", { viewport: "1280x600x1" });
    await ev(
      `async()=>{${wait}const e=document.getElementById('demo-sequence');if(!e.classList.contains('scene-static')||e.querySelector('video')||e.offsetHeight>innerHeight*2)throw Error('Short screen');return {shortStatic:true};}`,
    );
  }
  const consoleResult = await call("list_console_messages", {
    types: ["error"],
    pageSize: 30,
  });
  if (
    consoleResult.content.some(
      (x) => x.type === "text" && x.text.includes("msgid="),
    )
  )
    throw Error("Console errors");
  console.log("Demo sequence review passed", reduced ? "reduced" : "normal");
} finally {
  await fs.writeFile(
    `design/qa/demo-sequence${reduced ? "-reduced" : ""}.json`,
    JSON.stringify(report, null, 2),
  );
  await client.close();
}
