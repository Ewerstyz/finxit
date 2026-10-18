import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import fs from 'node:fs/promises';
import path from 'node:path';
const client = new Client({name:'cinematic-hero-qa',version:'1.0.0'});
const transport = new StdioClientTransport({command:process.execPath,args:[path.resolve('node_modules/chrome-devtools-mcp/build/src/bin/chrome-devtools-mcp.js'),'--headless','--isolated','--no-usage-statistics','--no-performance-crux','--no-page-id-routing',`--workspace=${process.cwd()}`],stderr:'pipe'});
const results=[];
async function call(name,args={}) { const result=await client.callTool({name,arguments:args}); results.push({name,args,result}); if(result.isError)throw Error(JSON.stringify(result)); return result; }
const ev=fn=>call('evaluate_script',{function:fn.toString()});
try {
 await client.connect(transport);
 await call('new_page',{url:'http://127.0.0.1:4173/',timeout:20000});
 await call('emulate',{viewport:'1440x1000x1'});
 await ev(async()=>{await document.fonts.ready; await new Promise(r=>setTimeout(r,1000));return {hero:!!document.querySelector('.cinema-hero')};});
 await call('take_screenshot',{filePath:'design/qa/scrolltide-hero-desktop-start.png'});
 await ev(async()=>{const h=document.querySelector('.cinema-hero');window.scrollTo({top:h.offsetTop+(h.offsetHeight-innerHeight)*.75,behavior:'instant'});await new Promise(r=>setTimeout(r,500));const v=document.querySelector('.cinema-video');return {progress:.75,currentTime:v.currentTime,paused:v.paused,autoplay:v.autoplay,ready:v.readyState};});
 await call('take_screenshot',{filePath:'design/qa/scrolltide-hero-desktop-progress.png'});
 await ev(async()=>{const h=document.querySelector('.cinema-hero');window.scrollTo({top:h.offsetTop+(h.offsetHeight-innerHeight)*.25,behavior:'instant'});await new Promise(r=>setTimeout(r,400));const v=document.querySelector('.cinema-video');const first=v.currentTime;await new Promise(r=>setTimeout(r,300));return {progress:.25,currentTime:v.currentTime,held:first===v.currentTime,paused:v.paused};});
 for(const viewport of ['390x844x1','320x675x1','1440x675x1']){
   await call('emulate',{viewport});
   await ev(async()=>{window.scrollTo({top:0,behavior:'instant'});await new Promise(r=>setTimeout(r,400));const copy=document.querySelector('.cinema-copy').getBoundingClientRect();const bottom=document.querySelector('.cinema-bottom').getBoundingClientRect();return {width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,copyBottom:copy.bottom,bottomTop:bottom.top,overlap:copy.bottom>bottom.top,range:document.querySelector('.cinema-timeline input').getBoundingClientRect().bottom,videoTime:document.querySelector('.cinema-video').currentTime};});
   await call('take_screenshot',{filePath:`design/qa/scrolltide-hero-${viewport}.png`});
 }
 await call('list_console_messages',{types:['error'],pageSize:30});
} finally {await fs.writeFile('design/qa/scrolltide-hero-qa.json',JSON.stringify(results,null,2));await client.close();}
console.log('Hero QA completed');
