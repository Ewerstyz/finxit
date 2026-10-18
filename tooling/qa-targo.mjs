import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "node:fs/promises";
import path from "node:path";
const client = new Client({ name: "targo-review", version: "1.0.0" });
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
    function: `async()=>{await document.fonts.ready;await new Promise(r=>setTimeout(r,3500));const videos=[...document.querySelectorAll('video')];const before=videos.map(v=>v.currentTime);await new Promise(r=>setTimeout(r,1300));const media=videos.map((v,i)=>({src:v.src,ready:v.readyState,width:v.videoWidth,height:v.videoHeight,playing:!v.paused,advanced:v.currentTime!==before[i],error:v.error?.code??null,autoplay:v.autoplay,muted:v.muted,loop:v.loop,playsInline:v.playsInline,preload:v.preload}));if(document.querySelectorAll('section').length!==2||document.querySelector('footer')||videos.length!==2)throw Error('Two-section structure failed');if(media.some(v=>!v.autoplay||!v.muted||!v.loop||!v.playsInline||v.preload!=='auto'))throw Error('Video attributes failed');return {sections:2,headingLines:document.querySelectorAll('h1>span').length,font:getComputedStyle(document.body).fontFamily,fontLoaded:document.fonts.check('700 80px Quantico'),media};}`,
  });
  for (const viewport of [
    "1440x1000x1",
    "1280x600x1",
    "701x900x1",
    "700x900x1",
    "390x844x1",
    "320x740x1",
  ]) {
    await call("emulate", { viewport });
    await call("evaluate_script", {
      function: `async()=>{window.scrollTo({top:0,behavior:'instant'});await new Promise(r=>setTimeout(r,150));const hero=document.querySelector('.targo-hero');const media=getComputedStyle(document.querySelector('.hero-video'));const cta=document.querySelector('.hero-cta').getBoundingClientRect();if(document.documentElement.scrollWidth>innerWidth)throw Error('Overflow at '+innerWidth);if(innerWidth>700&&cta.bottom>innerHeight+1)throw Error('Hero CTA clipped on short screen');return {width:innerWidth,height:innerHeight,heroHeight:hero.offsetHeight,ctaBottom:cta.bottom,videoWidth:media.width,fit:media.objectFit,scrim:getComputedStyle(document.querySelector('.hero-scrim')).display,hamburger:getComputedStyle(document.querySelector('.hamburger')).display};}`,
    });
    await call("take_screenshot", {
      filePath: `design/qa/targo-hero-${viewport}.png`,
    });
    await call("evaluate_script", {
      function: `async()=>{document.getElementById('about').scrollIntoView({behavior:'instant'});await new Promise(r=>setTimeout(r,150));const video=document.querySelector('.about-video').getBoundingClientRect();const tint=document.querySelector('.about-tint').getBoundingClientRect();if(Math.abs(video.right-innerWidth)>1||Math.abs(video.width-tint.width)>1||Math.abs(video.height-tint.height)>1)throw Error('About media alignment failed');return {right:video.right,width:video.width,height:video.height,tintAligned:true};}`,
    });
    await call("take_screenshot", {
      filePath: `design/qa/targo-about-${viewport}.png`,
    });
  }
  await call("evaluate_script", {
    function: `async()=>{window.scrollTo({top:0,behavior:'instant'});const menu=document.querySelector('.hamburger');menu.click();await new Promise(r=>setTimeout(r,100));if(menu.getAttribute('aria-expanded')!=='true'||document.querySelectorAll('.mobile-links a').length!==3)throw Error('Mobile menu failed');return {menuOpen:true};}`,
  });
  await call("press_key", { key: "Escape" });
  await call("evaluate_script", {
    function: `()=>{const menu=document.querySelector('.hamburger');if(menu.getAttribute('aria-expanded')!=='false'||document.activeElement!==menu)throw Error('Menu Escape failed');const missing=[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.getAttribute('href').slice(1)));if(missing.length)throw Error('Broken anchors');return {escape:true,anchors:true};}`,
  });
  await call("list_console_messages", { types: ["error"], pageSize: 30 });
} finally {
  await fs.writeFile(
    "design/qa/targo-review.json",
    JSON.stringify(results, null, 2),
  );
  await client.close();
}
console.log("Targo review passed");
