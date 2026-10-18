import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "node:fs/promises";
import path from "node:path";
const client = new Client({ name: "finxi-redesign-review", version: "1.0.0" });
const reduced = process.argv.includes("--reduced");
const quick = process.argv.includes("--quick");
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
  const r = await client.callTool({ name, arguments: args });
  results.push({ name, args, result: r });
  if (r.isError) throw Error(JSON.stringify(r));
  return r;
}
try {
  await client.connect(transport);
  await call("new_page", { url: "http://127.0.0.1:4173/", timeout: 20000 });
  if (!reduced) {
    for (const viewport of quick
      ? []
      : ["1440x1000x1", "768x1024x1", "390x844x1", "320x740x1"]) {
      await call("emulate", { viewport });
      await call("evaluate_script", {
        function: `async()=>{window.scrollTo({top:0,behavior:'instant'});await document.fonts.ready;await new Promise(r=>setTimeout(r,700));if(document.documentElement.scrollWidth>innerWidth)throw Error('Horizontal overflow');const links=[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.getAttribute('href').slice(1)));if(links.length)throw Error('Broken anchor');return {width:innerWidth,height:innerHeight,h1:document.querySelector('h1').textContent,documentHeight:document.documentElement.scrollHeight};}`,
      });
      await call("take_screenshot", {
        filePath: `design/qa/redesign-hero-${viewport}.png`,
      });
      for (const [p, file] of [
        [0.18, "finxi-app-home"],
        [0.48, "finxi-app-reports"],
        [0.84, "finxi-app-assistant"],
        [0.12, "finxi-app-home"],
      ]) {
        await call("evaluate_script", {
          function: `async()=>{const e=document.getElementById('jornada');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*${p},behavior:'instant'});await new Promise(r=>setTimeout(r,1500));const v=e.querySelector('.is-current video');if(!v||!v.src.endsWith('/${file}.mp4'))throw Error('Wrong active film');const target=.05+Math.min(1,Math.max(0,${p}*3-Math.floor(${p}*3)))*(v.duration-.09);const t=v.currentTime;await new Promise(r=>setTimeout(r,200));if(!v.paused||v.autoplay||Math.abs(t-target)>.16||t!==v.currentTime)throw Error('Video progress incorrect');if(document.documentElement.scrollWidth>innerWidth)throw Error('Overflow');return {src:v.getAttribute('src'),time:t,target,duration:v.duration,paused:v.paused,stationary:t===v.currentTime};}`,
        });
        if ([0.48, 0.84].includes(p) && viewport !== "768x1024x1")
          await call("take_screenshot", {
            filePath: `design/qa/redesign-journey-${file}-${viewport}.png`,
          });
      }
      for (const id of ["financeiro", "inteligencia", "empresa", "download"]) {
        await call("evaluate_script", {
          function: `async()=>{document.getElementById('${id}').scrollIntoView({behavior:'instant'});await new Promise(r=>setTimeout(r,350));return {section:'${id}',overflow:document.documentElement.scrollWidth>innerWidth};}`,
        });
        if (viewport === "1440x1000x1" || viewport === "390x844x1")
          await call("take_screenshot", {
            filePath: `design/qa/redesign-${id}-${viewport}.png`,
          });
      }
    }
    await call("evaluate_script", {
      function: `()=>{const tab=document.querySelector('[role=tab]');tab.focus();return tab.textContent;}`,
    });
    await call("press_key", { key: "ArrowRight" });
    await call("evaluate_script", {
      function: `async()=>{const current=document.querySelector('[role=tab][data-state=active]');if(!current.textContent.includes('Planejar'))throw Error('Keyboard tabs failed');document.querySelector('.module-details [data-slot=accordion-trigger]').click();await new Promise(r=>setTimeout(r,100));if(document.querySelector('.module-details [data-slot=accordion-trigger]').getAttribute('aria-expanded')!=='true')throw Error('Accordion failed');document.querySelector('.download .button').click();await new Promise(r=>setTimeout(r,100));if(!document.querySelector('.download [role=status]').textContent.includes('em breve'))throw Error('Download notice failed');return {keyboardTabs:current.textContent,accordion:true,downloadNotice:true};}`,
    });
    await call("emulate", { viewport: "390x844x1" });
    await call("evaluate_script", {
      function: `async()=>{window.scrollTo({top:0,behavior:'instant'});const toggle=document.querySelector('.menu-toggle');toggle.click();await new Promise(r=>setTimeout(r,100));if(toggle.getAttribute('aria-expanded')!=='true')throw Error('Menu failed');return {menuOpen:true};}`,
    });
    await call("press_key", { key: "Escape" });
    await call("evaluate_script", {
      function: `()=>{const toggle=document.querySelector('.menu-toggle');if(toggle.getAttribute('aria-expanded')!=='false'||document.activeElement!==toggle)throw Error('Menu Escape failed');return {menuEscape:true};}`,
    });
    await call("emulate", { viewport: "844x390x1" });
    await call("evaluate_script", {
      function: `async()=>{await new Promise(r=>setTimeout(r,200));const e=document.getElementById('jornada');if(!e.classList.contains('journey-static')||e.querySelector('video'))throw Error('Short screen fallback failed');return {shortScreen:true,overflow:document.documentElement.scrollWidth>innerWidth};}`,
    });
  } else {
    await call("emulate", { viewport: "390x844x1" });
    await call("evaluate_script", {
      function: `async()=>{await new Promise(r=>setTimeout(r,300));const e=document.getElementById('jornada');e.scrollIntoView({behavior:'instant'});if(!e.classList.contains('journey-static')||e.querySelector('video')||e.querySelectorAll('.journey-static-step').length!==3)throw Error('Reduced motion failed');return {reducedMotion:true,staticSteps:3};}`,
    });
    await call("take_screenshot", {
      filePath: "design/qa/redesign-reduced-motion.png",
    });
  }
  await call("evaluate_script", {
    function: `async()=>{const images=[...document.images];images.forEach(i=>i.loading='eager');await Promise.race([Promise.all(images.map(i=>i.decode().catch(()=>null))),new Promise(r=>setTimeout(r,5000))]);const broken=images.filter(i=>!i.naturalWidth).map(i=>i.src);if(broken.length)throw Error('Broken images: '+broken.join());return {images:images.length,broken};}`,
  });
  if (quick) {
    for (const viewport of ["1440x1000x1", "390x844x1"]) {
      await call("emulate", { viewport });
      await call("evaluate_script", {
        function: `async()=>{document.getElementById('marketing').scrollIntoView({behavior:'instant'});await new Promise(r=>setTimeout(r,250));return {section:'marketing'};}`,
      });
      await call("take_screenshot", {
        filePath: `design/qa/redesign-marketing-${viewport}.png`,
      });
      await call("evaluate_script", {
        function: `async()=>{const e=document.getElementById('jornada');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*.12,behavior:'instant'});await new Promise(r=>setTimeout(r,800));return {section:'jornada'};}`,
      });
      await call("take_screenshot", {
        filePath: `design/qa/redesign-home-film-${viewport}.png`,
      });
    }
  }
  await call("list_console_messages", { types: ["error"], pageSize: 30 });
} finally {
  await fs.writeFile(
    `design/qa/redesign-${reduced ? "reduced" : quick ? "interactions" : "review"}.json`,
    JSON.stringify(results, null, 2),
  );
  await client.close();
}
console.log("Redesign review passed");
