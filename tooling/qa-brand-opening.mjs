import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "node:fs/promises";
import path from "node:path";
const reduced = process.argv.includes("--reduced");
const mobile = process.argv.includes("--mobile");
const media = JSON.parse(
  await fs.readFile("src/cinematic/opening-media.json", "utf8"),
);
const client = new Client({
  name: "finxi-brand-opening-review",
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
const report = [];
async function call(name, args = {}) {
  const r = await client.callTool({ name, arguments: args });
  report.push({ name, args, result: r });
  if (r.isError) throw Error(JSON.stringify(r));
  return r;
}
const ev = (fn) => call("evaluate_script", { function: fn });
try {
  await client.connect(transport);
  await call("new_page", {
    url: "http://127.0.0.1:4173/?version=brand-opening",
    timeout: 20000,
  });
  for (const viewport of reduced
    ? ["390x844x1"]
    : mobile
      ? ["390x844x1", "320x740x1"]
      : ["1440x1000x1", "768x1024x1", "390x844x1", "320x740x1"]) {
    await call("emulate", { viewport });
    await ev(
      `async()=>{scrollTo({top:0,behavior:'instant'});await document.fonts.ready;for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>Promise.race([i.decode().catch(()=>{}),new Promise(r=>setTimeout(r,3000))])));await new Promise(r=>setTimeout(r,300));if(document.documentElement.scrollWidth>innerWidth)throw Error('Overflow');if([...document.images].some(i=>!i.naturalWidth))throw Error('Missing image');if(document.querySelector('input[type=range],.journey-progress-track'))throw Error('Progress bar');if(document.querySelectorAll('h1').length!==1)throw Error('H1');return {width:innerWidth,static:!!document.querySelector('.zoom-journey-static')};}`,
    );
    await call("take_screenshot", {
      filePath: `design/qa/brand-opening-${viewport}${reduced ? "-reduced" : ""}.png`,
    });
    if (reduced) {
      await ev(
        `()=>{if(document.querySelectorAll('.journey-static-panel').length!==4||document.querySelector('#inicio video'))throw Error('Reduced motion');return {panels:4,video:false};}`,
      );
      continue;
    }
    await ev(
      `async()=>{const v=document.querySelector('.journey-film');if(!v)throw Error('Opening film missing');if(v.readyState<2)await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Video metadata timeout')),5000);v.addEventListener('loadeddata',()=>{clearTimeout(timer);resolve();},{once:true});});if(!v.currentSrc.endsWith('/media/${media.file}.mp4')||Math.abs(v.duration-${media.duration})>.05||v.videoWidth!==${media.width || 1280}||v.videoHeight!==${media.height || 720})throw Error('Wrong opening film '+JSON.stringify({src:v.currentSrc,duration:v.duration,width:v.videoWidth,height:v.videoHeight}));return {installedFilm:v.currentSrc,duration:v.duration,width:v.videoWidth,height:v.videoHeight};}`,
    );
    for (const [p, index] of [
      [0, 0],
      [0.29, 1],
      [0.59, 2],
      [0.94, 3],
      [0.12, 0],
    ]) {
      await ev(
        `async()=>{const e=document.getElementById('inicio');scrollTo({top:(e.offsetHeight-innerHeight)*${p},behavior:'instant'});await new Promise(r=>setTimeout(r,1200));const c=document.querySelector('.journey-copy-${index}'),b=c.getBoundingClientRect(),n=document.querySelector('.journey-navigation').getBoundingClientRect();if(c.getAttribute('aria-hidden')!=='false'||Number(getComputedStyle(c).opacity)!==1)throw Error('Chapter');if(b.top<80||b.bottom>n.top-8)throw Error('Copy collision '+JSON.stringify({b,n}));if(document.documentElement.scrollWidth>innerWidth)throw Error('Overflow');const v=document.querySelector('.journey-film'),from=${media.progressStart || 0},wanted=v?Math.max(0,Math.min(1,(${p}-from)/(1-from)))*(v.duration-.04):0;if(${!!media.file}&&!v)throw Error('Opening film missing');if(v&&(!v.paused||v.autoplay||Math.abs(v.currentTime-wanted)>.2||Number(getComputedStyle(v).opacity)!==(${p}>=from?1:0)))throw Error('Scroll seek '+JSON.stringify({time:v.currentTime,wanted,opacity:getComputedStyle(v).opacity}));if(v){const time=v.currentTime;await new Promise(r=>setTimeout(r,150));if(v.currentTime!==time)throw Error('Autoplay');}return {chapter:${index},top:b.top,bottom:b.bottom,video:!!v,time:v?.currentTime,wanted};}`,
      );
      if (["1440x1000x1", "390x844x1"].includes(viewport) && p !== 0.12)
        await call("take_screenshot", {
          filePath: `design/qa/brand-opening-chapter-${index}-${viewport}.png`,
        });
    }
    await ev(
      `async()=>{const e=document.getElementById('inicio');const samples=[];for(const p of [.21,.24,.21]){scrollTo({top:(e.offsetHeight-innerHeight)*p,behavior:'instant'});await new Promise(r=>setTimeout(r,150));const visible=[...document.querySelectorAll('.journey-copy')].filter(c=>c.getAttribute('aria-hidden')==='false');if(visible.length!==1)throw Error('Copy accessibility');const c=visible[0],opacity=Number(getComputedStyle(c).opacity),transform=getComputedStyle(c).transform;if(!(opacity>0&&opacity<1)||transform==='none')throw Error('Copy motion missing');samples.push({chapter:c.className,opacity,transform});}if(JSON.stringify(samples[0])!==JSON.stringify(samples[2]))throw Error('Copy motion cannot reverse');return {reversibleCopyMotion:samples};}`,
    );
    await ev(
      `async()=>{document.getElementById('para-quem').scrollIntoView({behavior:'instant'});await new Promise(r=>setTimeout(r,200));const labels=[...document.querySelectorAll('.brazil-network text')].map(x=>x.textContent);if(!['Norte','Nordeste','Centro-Oeste','Sudeste','Sul'].every(x=>labels.includes(x)))throw Error('Regional map');return {regions:5};}`,
    );
    await ev(
      `async()=>{const e=document.querySelector('.app-demo');scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*.24,behavior:'instant'});await new Promise(r=>setTimeout(r,1500));const v=e.querySelector('[role="tabpanel"][data-state="active"] video');if(!v||!v.paused||!v.currentSrc.endsWith('/media/finxi-plan-organize.mp4')||Math.abs(v.currentTime-(.05+(.72/.95)*(v.duration-.1)))>.2)throw Error('App film');return {appVideo:v.src,currentTime:v.currentTime,paused:v.paused};}`,
    );
  }
  await call("emulate", { viewport: "1280x600x1" });
  await ev(
    `async()=>{await new Promise(r=>setTimeout(r,100));if(!document.querySelector('.zoom-journey-static')||document.querySelector('#inicio video'))throw Error('Short mode');return {shortStatic:true};}`,
  );
  await call("list_console_messages", { types: ["error"], pageSize: 30 });
  console.log("Opening review passed", reduced ? "reduced" : "normal");
} finally {
  await fs.writeFile(
    `design/qa/brand-opening${reduced ? "-reduced" : mobile ? "-mobile" : ""}.json`,
    JSON.stringify(report, null, 2),
  );
  await client.close();
}
