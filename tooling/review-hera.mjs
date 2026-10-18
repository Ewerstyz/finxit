import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import fs from 'node:fs/promises';
import path from 'node:path';
const reduced=process.argv.includes('--reduced');
const client=new Client({name:'finxi-hera-review',version:'1.0.0'});
const transport=new StdioClientTransport({command:process.execPath,args:[path.resolve('node_modules/chrome-devtools-mcp/build/src/bin/chrome-devtools-mcp.js'),'--headless','--isolated','--no-usage-statistics','--no-performance-crux','--no-page-id-routing',`--workspace=${process.cwd()}`,...(reduced?['--chromeArg=--force-prefers-reduced-motion']:[])],stderr:'pipe'});
const report=[];
async function call(name,args={}) { const result=await client.callTool({name,arguments:args});report.push({name,args,result});if(result.isError)throw Error(JSON.stringify(result));return result; }
const evaluate=fn=>call('evaluate_script',{function:fn.toString()});
try {
 await client.connect(transport);
 await call('new_page',{url:'http://127.0.0.1:4173/',timeout:20000});
 await call('emulate',{viewport:'1440x1120x1'});
 await evaluate(async()=>{await document.fonts.ready;return {pillars:document.querySelectorAll('.pillar').length,problems:document.querySelectorAll('.problem').length,solutions:document.querySelectorAll('.solution').length,brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),overflow:document.documentElement.scrollWidth>innerWidth};});
 if(reduced){
   await evaluate(()=>({reduced:matchMedia('(prefers-reduced-motion:reduce)').matches,static:document.querySelectorAll('.story-static').length,videos:document.querySelectorAll('video').length,chapters:document.querySelectorAll('.static-chapters h2').length,heights:[...document.querySelectorAll('.story-static')].map(e=>e.offsetHeight)}));
 }else{
   await call('take_screenshot',{filePath:'design/qa/hera-desktop.png'});
   for(const id of ['financeiro','estrategia','marketing']){
     await call('evaluate_script',{function:`()=>{document.getElementById('${id}').scrollIntoView({behavior:'instant'});return true;}`});
     await call('take_screenshot',{filePath:`design/qa/hera-${id}.png`});
   }
   for(const id of ['experiencia','filme-registros','filme-planejamento']){
     for(const p of [.75,.25]){
       await call('evaluate_script',{function:`async()=>{const e=document.getElementById('${id}');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*${p},behavior:'instant'});await new Promise(r=>setTimeout(r,1000));const v=e.querySelector('video');const t=v?.currentTime;await new Promise(r=>setTimeout(r,250));return {id:'${id}',p:${p},time:v?.currentTime,duration:v?.duration,paused:v?.paused,autoplay:v?.autoplay,stationary:t===v?.currentTime,src:v?.getAttribute('src'),stage:e.querySelector('.product-stage').getBoundingClientRect().toJSON()};}`});
     }
   }
   await evaluate(()=>{document.querySelector('.challenge-tabs [role=tab]').focus();return true;});
   await call('press_key',{key:'ArrowRight'});
   await evaluate(()=>({selected:document.querySelector('.challenge-tabs [aria-selected=true]').textContent,href:document.querySelector('.prompt-bar').getAttribute('href')}));
   await evaluate(async()=>{const b=document.querySelector('#estrategia-detalhes button');b.click();await new Promise(r=>setTimeout(r,100));return {expanded:b.getAttribute('aria-expanded'),text:document.querySelector('#estrategia-detalhes [data-slot=accordion-content]').textContent};});
   await evaluate(async()=>{document.querySelectorAll('.connection-tabs [role=tab]')[2].click();await new Promise(r=>setTimeout(r,250));return document.querySelector('.connected-result').innerText;});
   for(const width of [820,390,320]){
     await call('emulate',{viewport:`${width}x844x1`});
     await evaluate(async()=>{window.scrollTo({top:0,behavior:'instant'});await new Promise(r=>setTimeout(r,100));return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,overflows:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.right>innerWidth+1&&!e.closest('.showcase-card');}).slice(0,8).map(e=>e.className)};});
     if(width===390){
       await call('take_screenshot',{filePath:'design/qa/hera-mobile.png'});
       await evaluate(async()=>{const e=document.getElementById('filme-registros');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*.75,behavior:'instant'});await new Promise(r=>setTimeout(r,650));return {time:e.querySelector('video').currentTime,stage:e.querySelector('.product-stage').getBoundingClientRect().toJSON()};});
       await call('take_screenshot',{filePath:'design/qa/hera-mobile-film.png'});
       await evaluate(()=>{window.scrollTo({top:0,behavior:'instant'});document.querySelector('.menu-toggle').click();return {open:document.querySelector('.menu-toggle').getAttribute('aria-expanded')};});
       await call('press_key',{key:'Escape'});
       await evaluate(()=>({closed:document.querySelector('.menu-toggle').getAttribute('aria-expanded'),focus:document.activeElement.className}));
     }
   }
 }
 await call('list_console_messages',{types:['error'],pageSize:30});
}finally{await fs.writeFile(`design/qa/hera-${reduced?'reduced':'review'}.json`,JSON.stringify(report,null,2));await client.close();}
console.log('Review complete:',report.length,'MCP operations');
