import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "node:fs/promises";
import path from "node:path";
const reduced = process.argv.includes("--reduced");
const client = new Client({ name: "finxi-technology-qa", version: "1.0.0" });
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
  const result = await client.callTool({ name, arguments: args });
  report.push({ name, args, result });
  if (result.isError) throw Error(JSON.stringify(result));
  return result;
}
async function ev(fn) {
  return call("evaluate_script", { function: fn });
}
try {
  await client.connect(transport);
  await call("new_page", { url: "http://127.0.0.1:4173/", timeout: 20000 });
  await ev(
    `async()=>{await document.fonts.ready;const missing=[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1)));if(missing.length)throw Error('Bad anchors');if(document.querySelectorAll('h1').length!==1)throw Error('H1 hierarchy');return {title:document.title,font:document.fonts.check('600 60px "Space Grotesk"'),sections:[...document.querySelectorAll('main>section')].map(s=>s.id||s.className)};}`,
  );
  await ev(
    `()=>{if(document.querySelector('input[type=range],.journey-progress-track'))throw Error('Progress bars remain');if([...document.images].some(i=>/empreendedora|finxi-neighborhood|finxi-workspace/.test(i.src)))throw Error('Retail image remains');const labels=[...document.querySelectorAll('.brazil-network text')].map(e=>e.textContent);if(!['Norte','Nordeste','Centro-Oeste','Sudeste','Sul'].every(x=>labels.includes(x)))throw Error('Brazil regions missing');return {bars:0,retailImages:0,regions:5,headingFont:getComputedStyle(document.querySelector('h1')).fontFamily};}`,
  );
  for (const viewport of reduced
    ? ["390x844x1"]
    : ["1440x1000x1", "768x1024x1", "390x844x1", "320x740x1"]) {
    await call("emulate", { viewport });
    await ev(
      `async()=>{window.scrollTo({top:0,behavior:'instant'});await new Promise(r=>setTimeout(r,350));for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>Promise.race([i.decode().catch(()=>{}),new Promise(r=>setTimeout(r,3000))])));if([...document.images].some(i=>!i.naturalWidth))throw Error('Image failed');if(document.documentElement.scrollWidth>innerWidth)throw Error('Horizontal overflow');return {width:innerWidth,images:[...document.images].length,static:!!document.querySelector('.zoom-journey-static')};}`,
    );
    await call("take_screenshot", {
      filePath: `design/qa/technology-hero-${viewport}${reduced ? "-reduced" : ""}.png`,
    });
    if (reduced) {
      await ev(
        `()=>{if(!document.querySelector('.zoom-journey-static')||document.querySelectorAll('.journey-static-panel').length!==3||document.querySelector('video'))throw Error('Reduced motion');return {staticStory:true,videos:0};}`,
      );
      continue;
    }
    for (const p of [0.53, 0.93]) {
      await ev(
        `async()=>{const e=document.getElementById('inicio');window.scrollTo({top:(e.offsetHeight-innerHeight)*${p},behavior:'instant'});await new Promise(r=>setTimeout(r,250));const copy=document.querySelector('.journey-copy-${p === 0.53 ? 1 : 2}');const b=copy.getBoundingClientRect();if(b.top<76||b.bottom>innerHeight-130)throw Error('Story text out of frame: '+JSON.stringify({top:b.top,bottom:b.bottom,height:innerHeight}));return {p:${p},top:b.top,bottom:b.bottom,active:copy.getAttribute('aria-hidden'),transform:document.querySelector('.journey-network').style.transform};}`,
      );
      await ev(
        `()=>{const chapter=document.querySelector('.journey-copy-${p === 0.53 ? 1 : 2}');const image=document.querySelector('.journey-${p === 0.53 ? "intelligence" : "core"}');if(Number(getComputedStyle(chapter).opacity)!==1||Number(getComputedStyle(image).opacity)!==1)throw Error('Wrong frame opacity');const hidden=[...document.querySelectorAll('.journey-copy[aria-hidden="true"]')];if(hidden.some(e=>getComputedStyle(e).visibility!=='hidden'||Number(getComputedStyle(e).opacity)!==0))throw Error('Text overlap');return {opacity:1,hiddenChapters:hidden.length};}`,
      );
      if (viewport === "1440x1000x1" || viewport === "390x844x1")
        await call("take_screenshot", {
          filePath: `design/qa/technology-story-${p}-${viewport}.png`,
        });
    }
    for (const id of [
      "empresa",
      "para-quem",
      "aplicativo",
      "inteligencia",
      "download",
    ]) {
      await ev(
        `async()=>{document.getElementById('${id}').scrollIntoView({behavior:'instant'});await new Promise(r=>setTimeout(r,200));if(document.documentElement.scrollWidth>innerWidth)throw Error('Section overflow');return {id:'${id}'};}`,
      );
      if (viewport === "1440x1000x1" || viewport === "390x844x1")
        await call("take_screenshot", {
          filePath: `design/qa/technology-${id}-${viewport}.png`,
        });
    }
    await ev(
      `async()=>{const e=document.querySelector('.app-demo');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*.72,behavior:'instant'});await new Promise(r=>setTimeout(r,1000));const v=e.querySelector('video');const wanted=3.8+.72*(v.duration-3.85);if(!v.paused||v.autoplay||Math.abs(v.currentTime-wanted)>.18)throw Error('Scroll seek failed');const t=v.currentTime;await new Promise(r=>setTimeout(r,180));if(t!==v.currentTime)throw Error('Film playing');const media=e.querySelector('.scene-media').getBoundingClientRect(),controls=e.querySelector('.scene-controls').getBoundingClientRect(),copy=e.querySelector('.demo-copy').getBoundingClientRect();if(media.bottom>controls.top-4||copy.top<145||controls.bottom>innerHeight)throw Error('Demo overlap '+JSON.stringify({media,controls,copy}));return {video:v.src,time:t,wanted,paused:v.paused,mediaBottom:media.bottom,controlsTop:controls.top};}`,
    );
    if (viewport === "1440x1000x1" || viewport === "390x844x1")
      await call("take_screenshot", {
        filePath: `design/qa/technology-demo-${viewport}.png`,
      });
  }
  if (!reduced) {
    await call("emulate", { viewport: "1440x1000x1" });
    for (const [name, file] of [
      ["Entenda", "finxi-app-reports"],
      ["Converse", "finxi-app-assistant"],
    ]) {
      await ev(
        `()=>{document.querySelector('[role=tab][data-state=active]').focus();return 'focused';}`,
      );
      await call("press_key", { key: "ArrowRight" });
      await ev(
        `async()=>{await new Promise(r=>setTimeout(r,150));const e=document.querySelector('.app-demo');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*.35,behavior:'instant'});await new Promise(r=>setTimeout(r,1100));const v=e.querySelector('video');if(!v?.src.endsWith('/${file}.mp4'))throw Error('Tab media mismatch');const wanted=.05+.35*(v.duration-.1);if(Math.abs(v.currentTime-wanted)>.18||!v.paused)throw Error('Tab seeking');return {name:'${name}',time:v.currentTime,wanted,query:location.search};}`,
      );
      for (const p of [0.82, 0.21])
        await ev(
          `async()=>{const e=document.querySelector('.app-demo');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*${p},behavior:'instant'});await new Promise(r=>setTimeout(r,500));const v=e.querySelector('video');const wanted=.05+${p}*(v.duration-.1);if(Math.abs(v.currentTime-wanted)>.18||!v.paused)throw Error('Bidirectional seek failed');return {file:'${file}',p:${p},time:v.currentTime,wanted};}`,
        );
      await call("take_screenshot", {
        filePath: `design/qa/technology-${file}-desktop.png`,
      });
    }
    await call("emulate", { viewport: "390x844x1" });
    await ev(
      `async()=>{const e=document.querySelector('.app-demo');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*.55,behavior:'instant'});const button=e.querySelector('.screen-preview-button');button.focus();button.click();await new Promise(r=>setTimeout(r,100));if(!document.querySelector('dialog[open]'))throw Error('Screen viewer failed');return {viewer:true,src:document.querySelector('dialog[open] img').src};}`,
    );
    await call("take_screenshot", {
      filePath: "design/qa/technology-screen-viewer-mobile.png",
    });
    await call("press_key", { key: "Escape" });
    await ev(
      `()=>{if(document.querySelector('dialog[open]')||!document.activeElement.classList.contains('screen-preview-button'))throw Error('Dialog keyboard/focus failed');return {viewerClosed:true,focusRestored:true};}`,
    );
    await ev(
      `async()=>{window.scrollTo({top:0,behavior:'instant'});document.querySelector('.menu-button').click();await new Promise(r=>setTimeout(r,50));if(document.querySelectorAll('.mobile-navigation a').length!==5)throw Error('Mobile menu');return 'open';}`,
    );
    await call("press_key", { key: "Escape" });
    await ev(
      `()=>{if(document.querySelector('.menu-button').getAttribute('aria-expanded')!=='false'||document.activeElement!==document.querySelector('.menu-button'))throw Error('Menu escape');document.querySelector('.feature-content [data-slot=accordion-trigger]').click();document.querySelector('.ai-details [data-slot=accordion-trigger]').click();document.querySelector('.download-button').click();return {providers:document.querySelectorAll('.provider-grid article').length,status:document.querySelector('[role=status]').textContent};}`,
    );
    await ev(
      `async()=>{window.scrollTo({top:0,behavior:'instant'});document.querySelector('.journey-chapters button:last-child').focus();return 'Chapter focused';}`,
    );
    await call("press_key", { key: "Enter" });
    await ev(
      `async()=>{await new Promise(r=>setTimeout(r,300));if(document.querySelector('.journey-chapters button:last-child').getAttribute('aria-current')!=='step'||Number(getComputedStyle(document.querySelector('.journey-core')).opacity)!==1)throw Error('Keyboard zoom navigation');return 'Chapter navigation works';}`,
    );
    await call("emulate", { viewport: "1280x600x1" });
    await ev(
      `async()=>{await new Promise(r=>setTimeout(r,200));if(!document.querySelector('.zoom-journey-static')||document.querySelector('video')||!document.querySelector('.scene-static'))throw Error('Short screen fallback');return {shortStatic:true};}`,
    );
  }
  await call("list_console_messages", { types: ["error"], pageSize: 30 });
} catch (e) {
  console.error(e);
  process.exitCode = 1;
} finally {
  await fs.writeFile(
    `design/qa/technology-${reduced ? "reduced" : "review"}.json`,
    JSON.stringify(report, null, 2),
  );
  await client.close();
}
