import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "node:fs/promises";
import path from "node:path";

const reduced = process.argv.includes("--reduced");
const client = new Client({ name: "finxi-mobile-scroll", version: "1.0.0" });
const report = [];
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
const evaluate = (fn) => call("evaluate_script", { function: fn });

// Check decoded frames, not just a changing timestamp behind a still poster.
const sampleFilm = `
  const deadline = performance.now() + 8000;
  let video;
  while (performance.now() < deadline) {
    video = document.querySelector(selector);
    if (video && video.readyState >= 2 && !video.seeking &&
        Math.abs(video.currentTime - expected(video)) < .18 &&
        Number(getComputedStyle(video).opacity) === 1) break;
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  if (!video || video.readyState < 2 || video.seeking ||
      Math.abs(video.currentTime - expected(video)) >= .18 ||
      Number(getComputedStyle(video).opacity) !== 1)
    throw Error('Video does not follow scroll: ' + JSON.stringify({selector,
      time:video?.currentTime,wanted:video && expected(video),ready:video?.readyState}));
  if (!video.paused || video.autoplay || !video.playsInline || !video.muted)
    throw Error('Video must stay paused, muted and inline');
  const canvas = document.createElement('canvas'); canvas.width=48; canvas.height=27;
  const ctx = canvas.getContext('2d'); ctx.drawImage(video,0,0,48,27);
  const pixels = ctx.getImageData(0,0,48,27).data;
  let hash=0; for(let i=0;i<pixels.length;i++) hash=(Math.imul(hash,31)+pixels[i])|0;
  const time=video.currentTime;
  await new Promise(resolve=>setTimeout(resolve,120));
  if (Math.abs(video.currentTime-time)>.001) throw Error('Film plays without scrolling');
  if (document.documentElement.scrollWidth>innerWidth) throw Error('Horizontal overflow');
  return {time,hash,paused:video.paused};`;

try {
  await client.connect(transport);
  await call("new_page", {
    url: "http://127.0.0.1:4173/?qa=mobile-scroll",
    timeout: 20000,
  });
  for (const viewport of reduced
    ? ["360x640x2,mobile,touch"]
    : [
        "320x568x2,mobile,touch",
        "360x640x2,mobile,touch",
        "375x667x2,mobile,touch",
        "390x844x2,mobile,touch",
        "844x390x2,mobile,touch,landscape",
        "1280x600x1",
        "1440x1000x1",
      ]) {
    await call("emulate", { viewport });
    await evaluate(`async()=>{scrollTo({top:0,behavior:'instant'});await document.fonts.ready;
      await new Promise(r=>setTimeout(r,150));
      const hero=document.getElementById('inicio'),demo=document.getElementById('demo-sequence');
      if (${reduced}) {
        if(!hero.classList.contains('zoom-journey-static')||!demo.classList.contains('scene-static')||
            document.querySelector('#inicio video,#demo-sequence video')) throw Error('Reduced motion ignored');
      } else if(hero.classList.contains('zoom-journey-static')||demo.classList.contains('scene-static'))
        throw Error('Scroll films disabled by viewport '+innerWidth+'x'+innerHeight);
      return {width:innerWidth,height:innerHeight,reduced:${reduced},touch:navigator.maxTouchPoints};}`);
    if (reduced) continue;
    const heroSamples = [];
    for (const p of [0.12, 0.59, 0.94, 0.12]) {
      const sample = await evaluate(`async()=>{
        const section=document.getElementById('inicio');
        scrollTo({top:section.getBoundingClientRect().top+scrollY+
          (section.offsetHeight-document.documentElement.clientHeight)*${p},behavior:'instant'});
        await new Promise(r=>setTimeout(r,150));
        const copy=document.querySelector('#inicio .journey-copy[aria-hidden="false"]'),
          box=copy.getBoundingClientRect(),nav=document.querySelector('.journey-navigation').getBoundingClientRect();
        if(box.top<76||box.bottom>nav.top-6) throw Error('Opening copy clipped: '+JSON.stringify({box,nav}));
        const selector='#inicio video',expected=v=>${p}*(v.duration-.04);
        ${sampleFilm}}`);
      heroSamples.push(sample);
    }
    const read = (result) =>
      JSON.parse(
        result.content
          .find((x) => x.type === "text")
          .text.match(/\{[\s\S]*\}/)[0],
      );
    const heroFrames = heroSamples.map(read);
    if (
      heroFrames[0].hash === heroFrames[1].hash ||
      heroFrames[1].hash === heroFrames[2].hash ||
      heroFrames[0].hash !== heroFrames[3].hash
    )
      throw Error("Opening decoded frames did not advance and reverse");
    const files = ["organize", "entenda", "converse"];
    const names = ["Organize", "Entenda", "Converse"];
    for (const [p, index, local] of [
      [0.15, 0, 0.45 / 0.95],
      [0.5, 1, 0.5 / 0.95],
      [0.99, 2, 1],
      [0.5, 1, 0.5 / 0.95],
      [0.15, 0, 0.45 / 0.95],
    ]) {
      await evaluate(`async()=>{
        const section=document.getElementById('demo-sequence');
        scrollTo({top:section.getBoundingClientRect().top+scrollY+
          (section.offsetHeight-document.documentElement.clientHeight)*${p},behavior:'instant'});
        await new Promise(r=>setTimeout(r,150));
        const panel=document.querySelector('.demo-tabs [role="tabpanel"][data-state="active"]'),
          tab=document.querySelector('.demo-selector [role="tab"][data-state="active"]');
        if(tab.textContent.trim()!=='${names[index]}') throw Error('Wrong automatic chapter');
        const tabs=document.querySelector('.demo-selector').getBoundingClientRect(),
          copy=panel.querySelector('.demo-copy').getBoundingClientRect(),
          film=panel.querySelector('.scene-film').getBoundingClientRect(),
          controls=panel.querySelector('.scene-controls').getBoundingClientRect();
        if(copy.top<tabs.bottom||film.height<90||film.bottom>controls.top||controls.bottom>innerHeight)
          throw Error('Mobile scene clipped: '+JSON.stringify({copy,film,tabs,controls}));
        const selector='.demo-tabs [role="tabpanel"][data-state="active"] video',
          expected=v=>.05+${local}*(v.duration-.1);
        ${sampleFilm}}`);
      if (p === 0.5)
        await call("take_screenshot", {
          filePath: `design/qa/mobile-scroll-${viewport.split(",")[0]}.png`,
        });
    }
    await evaluate(`async()=>{const section=document.getElementById('demo-sequence');
      scrollTo({top:section.getBoundingClientRect().top+scrollY+section.offsetHeight,behavior:'instant'});
      await new Promise(r=>setTimeout(r,150));
      if(document.querySelector('.demo-sequence-stage').getBoundingClientRect().bottom>1||
          document.getElementById('recursos').getBoundingClientRect().top>innerHeight)
        throw Error('Cannot continue below videos');return {continues:true};}`);
    console.log("Scroll films passed:", viewport);
  }
  const errors = await call("list_console_messages", {
    types: ["error"],
    pageSize: 30,
  });
  if (
    errors.content.some((x) => x.type === "text" && x.text.includes("msgid="))
  )
    throw Error("Console errors");
  console.log("Mobile scroll review passed", reduced ? "reduced" : "normal");
} finally {
  await fs.mkdir("design/qa", { recursive: true });
  await fs.writeFile(
    `design/qa/mobile-scroll${reduced ? "-reduced" : ""}.json`,
    JSON.stringify(report, null, 2),
  );
  await client.close();
}
