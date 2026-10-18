import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "node:fs/promises";
import path from "node:path";
const reduced = process.argv.includes("--reduced");
const quick = process.argv.includes("--quick");
const client = new Client({ name: "finxi-reference-review", version: "1.0.0" });
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
const results = [];
async function call(name, args = {}) {
  const result = await client.callTool({ name, arguments: args });
  results.push({ name, args, result });
  if (result.isError) throw Error(JSON.stringify(result));
  return result;
}
try {
  await client.connect(transport);
  await call("new_page", { url: "http://127.0.0.1:4173/", timeout: 20000 });
  await call("evaluate_script", {
    function: `async()=>{await document.fonts.ready;if(document.title.includes('Targo')||document.documentElement.lang!=='pt-BR')throw Error('Brand not adapted');if(document.querySelectorAll('section').length!==2)throw Error('Two main sections expected');const missing=[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.getAttribute('href').slice(1)));if(missing.length)throw Error('Missing anchors');return {title:document.title,sections:2,fontLoaded:document.fonts.check('700 80px Quantico')};}`,
  });
  if (reduced) {
    await call("emulate", { viewport: "390x844x1" });
    await call("evaluate_script", {
      function: `async()=>{await new Promise(r=>setTimeout(r,200));if(document.querySelector('video')||document.querySelectorAll('.scene-static').length!==3)throw Error('Reduced motion failed');return {staticScenes:3,videos:0,overflow:document.documentElement.scrollWidth>innerWidth};}`,
    });
    await call("take_screenshot", {
      filePath: "design/qa/finxi-reference-reduced.png",
    });
  } else {
    for (const viewport of quick
      ? []
      : ["1440x1000x1", "768x1024x1", "390x844x1", "320x740x1"]) {
      await call("emulate", { viewport });
      await call("evaluate_script", {
        function: `async()=>{window.scrollTo({top:0,behavior:'instant'});await new Promise(r=>setTimeout(r,300));if(document.documentElement.scrollWidth>innerWidth)throw Error('Overflow at '+innerWidth);return {width:innerWidth,height:innerHeight,documentHeight:document.documentElement.scrollHeight};}`,
      });
      await call("take_screenshot", {
        filePath: `design/qa/finxi-reference-hero-${viewport}.png`,
      });
      for (const [id, file, start] of [
        ["inicio", "finxi-app-home", 3.8],
        ["sobre", "finxi-app-reports", 0.05],
        ["inteligencia", "finxi-app-assistant", 0.05],
      ]) {
        for (const p of [0.72, 0.21]) {
          await call("evaluate_script", {
            function: `async()=>{const e=document.getElementById('${id}');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*${p},behavior:'instant'});await new Promise(r=>setTimeout(r,850));const v=e.querySelector('video');if(!v||!v.src.endsWith('/${file}.mp4'))throw Error('Wrong film');const t=v.currentTime;const target=${start}+${p}*(v.duration-${start}-.05);await new Promise(r=>setTimeout(r,150));if(!v.paused||v.autoplay||t!==v.currentTime||Math.abs(t-target)>.15)throw Error('Scroll synchronization failed');if(document.documentElement.scrollWidth>innerWidth)throw Error('Horizontal overflow');const controls=e.querySelector('.scene-controls').getBoundingClientRect();const copy=e.querySelector('.scene-copy');return {id:'${id}',time:t,target,paused:v.paused,stationary:t===v.currentTime,controlsVisible:controls.bottom<=innerHeight&&controls.top>=0,copyBottom:copy?.getBoundingClientRect().bottom};}`,
          });
          if (p === 0.72 && viewport !== "768x1024x1")
            await call("take_screenshot", {
              filePath: `design/qa/finxi-reference-${id}-${viewport}.png`,
            });
        }
      }
      for (const id of ["aplicativo", "empresa", "download"]) {
        await call("evaluate_script", {
          function: `async()=>{document.getElementById('${id}').scrollIntoView({behavior:'instant'});await new Promise(r=>setTimeout(r,200));if(document.documentElement.scrollWidth>innerWidth)throw Error('Content overflow');return {id:'${id}',overflow:false};}`,
        });
        if (viewport === "1440x1000x1" || viewport === "390x844x1")
          await call("take_screenshot", {
            filePath: `design/qa/finxi-reference-${id}-${viewport}.png`,
          });
      }
    }
    if (quick) {
      await call("emulate", { viewport: "390x844x1" });
      await call("evaluate_script", {
        function: `async()=>{window.scrollTo({top:0,behavior:'instant'});await new Promise(r=>setTimeout(r,700));document.getElementById('inicio-progress').focus();return {rangeFocused:true};}`,
      });
      await call("press_key", { key: "End" });
      await call("evaluate_script", {
        function: `async()=>{await new Promise(r=>setTimeout(r,700));const video=document.querySelector('#inicio video');if(Math.abs(video.currentTime-(video.duration-.05))>.15)throw Error('Range keyboard seek failed');return {rangeKeyboard:true,time:video.currentTime};}`,
      });
    }
    await call("evaluate_script", {
      function: `()=>{document.querySelector('[role=tab]').focus();return 'Tab focused';}`,
    });
    await call("press_key", { key: "ArrowRight" });
    await call("evaluate_script", {
      function: `async()=>{const current=document.querySelector('[role=tab][data-state=active]');if(!current.textContent.includes('Estratégia'))throw Error('Tab keyboard failed');document.querySelector('.feature-tabs [data-slot=accordion-trigger]').click();await new Promise(r=>setTimeout(r,100));if(document.querySelector('.feature-tabs [data-slot=accordion-trigger]').getAttribute('aria-expanded')!=='true')throw Error('Accordion failed');document.querySelector('.download .cta').click();await new Promise(r=>setTimeout(r,100));if(!document.querySelector('[role=status]').textContent.includes('em breve'))throw Error('Download status failed');return {keyboard:true,accordion:true,androidNotice:true};}`,
    });
    if (quick) {
      await call("evaluate_script", {
        function: `()=>{document.querySelector('[role=tab][data-state=active]').focus();return 'Active tab focused';}`,
      });
      await call("press_key", { key: "ArrowRight" });
      await call("evaluate_script", {
        function: `async()=>{await new Promise(r=>setTimeout(r,150));document.getElementById('aplicativo').scrollIntoView({behavior:'instant'});const image=document.querySelector('.feature-visual-marketing img');image.loading='eager';await image.decode();if(image.naturalWidth!==1536)throw Error('Marketing image failed');document.querySelector('.architecture [data-slot=accordion-trigger]').click();await new Promise(r=>setTimeout(r,100));if(document.querySelectorAll('.provider-grid>div').length!==3)throw Error('Model details failed');return {marketingImage:true,providers:3};}`,
      });
      await call("take_screenshot", {
        filePath: "design/qa/finxi-reference-marketing-mobile.png",
      });
    }
    await call("emulate", { viewport: "390x844x1" });
    await call("evaluate_script", {
      function: `async()=>{window.scrollTo({top:0,behavior:'instant'});document.querySelector('.hamburger').click();await new Promise(r=>setTimeout(r,100));if(document.querySelectorAll('.mobile-links a').length!==4)throw Error('Menu links failed');return {menuOpen:true};}`,
    });
    await call("press_key", { key: "Escape" });
    await call("evaluate_script", {
      function: `()=>{const button=document.querySelector('.hamburger');if(button.getAttribute('aria-expanded')!=='false'||document.activeElement!==button)throw Error('Menu escape failed');return {escape:true};}`,
    });
    await call("emulate", { viewport: "1280x600x1" });
    await call("evaluate_script", {
      function: `async()=>{await new Promise(r=>setTimeout(r,200));if(document.querySelector('video')||document.querySelectorAll('.scene-static').length!==3)throw Error('Short screen fallback failed');return {shortScreen:true,videos:0};}`,
    });
  }
  await call("evaluate_script", {
    function: `async()=>{const images=[...document.images];images.forEach(i=>i.loading='eager');await Promise.race([Promise.all(images.map(i=>i.decode().catch(()=>null))),new Promise(r=>setTimeout(r,5000))]);const broken=images.filter(i=>!i.naturalWidth).map(i=>i.src);if(broken.length)throw Error('Broken images');return {images:images.length,broken};}`,
  });
  await call("list_console_messages", { types: ["error"], pageSize: 30 });
} finally {
  await fs.writeFile(
    "design/qa/finxi-reference-" +
      (reduced ? "reduced" : quick ? "interactions" : "review") +
      ".json",
    JSON.stringify(results, null, 2),
  );
  await client.close();
}
console.log("FinxiIT reference review passed");
