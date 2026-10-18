import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
import fs from 'node:fs/promises';import path from 'node:path';
const reduced=process.argv.includes('--reduced');
const c=new Client({name:'finxi-scrolltide',version:'1.0.0'});
const t=new StdioClientTransport({command:process.execPath,args:[path.resolve('node_modules/chrome-devtools-mcp/build/src/bin/chrome-devtools-mcp.js'),'--headless','--isolated','--no-usage-statistics','--no-performance-crux','--no-page-id-routing',`--workspace=${process.cwd()}`,...(reduced?['--chromeArg=--force-prefers-reduced-motion']:[])],stderr:'pipe'});
const results=[];
async function call(name,args={}){const r=await c.callTool({name,arguments:args});results.push({name,args,result:r});if(r.isError)throw Error(JSON.stringify(r));return r;}
const ev=fn=>call('evaluate_script',{function:fn.toString()});
try{
 await c.connect(t);await call('new_page',{url:'http://127.0.0.1:4173/',timeout:20000});await call('emulate',{viewport:'1440x1000x1'});
 await ev(async()=>{await document.fonts.ready;return {brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),overflow:document.documentElement.scrollWidth>innerWidth,headings:[...document.querySelectorAll('h1,h2')].map(e=>e.textContent),videos:[...document.querySelectorAll('video')].map(v=>v.getAttribute('src'))};});
 if(reduced){
  await ev(()=>({reduced:matchMedia('(prefers-reduced-motion:reduce)').matches,videoCount:document.querySelectorAll('video').length,staticCount:document.querySelectorAll('.story-static').length,staticChapters:document.querySelectorAll('.static-chapters h3').length,hero:document.querySelector('.cinema-hero').offsetHeight}));
 }else{
  for(const id of ['empresa','aplicativo','inteligencia','android']){await call('evaluate_script',{function:`()=>{document.getElementById('${id}').scrollIntoView({behavior:'instant'});return true;}`});await call('take_screenshot',{filePath:`design/qa/scrolltide-${id}.png`});}
  for(const id of ['experiencia','filme-estrategia','filme-planejamento']){
   for(const p of [.75,.25]){await call('evaluate_script',{function:`async()=>{const e=document.getElementById('${id}');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*${p},behavior:'instant'});await new Promise(r=>setTimeout(r,800));const v=e.querySelector('video');const initial=v.currentTime;await new Promise(r=>setTimeout(r,200));return {id:'${id}',p:${p},time:v.currentTime,duration:v.duration,stationary:v.currentTime===initial,paused:v.paused,autoplay:v.autoplay,src:v.getAttribute('src')};}`});if(p===.75)await call('take_screenshot',{filePath:`design/qa/scrolltide-${id}.png`});}
  }
  await ev(()=>{document.querySelectorAll('.intelligence-module-list [role=tab]')[2].focus();return true;});await call('press_key',{key:'Enter'});await ev(()=>({tab:document.querySelector('.intelligence-module-list [aria-selected=true]').textContent,content:document.querySelector('.intelligence-module-content[data-state=active]').textContent}));
  await ev(()=>{document.querySelector('.download-button').focus();return true;});await call('press_key',{key:'Enter'});await ev(()=>({notice:document.querySelector('.download-notice').innerText}));
  for(const width of [820,390,320]){await call('emulate',{viewport:`${width}x844x1`});await ev(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,wide:[...document.querySelectorAll('main *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1&&!e.closest('.download-product')).slice(0,8).map(e=>e.className)}));if(width===390){for(const id of ['inteligencia','android']){await call('evaluate_script',{function:`()=>{document.getElementById('${id}').scrollIntoView({behavior:'instant'});return true;}`});await call('take_screenshot',{filePath:`design/qa/scrolltide-mobile-${id}.png`});}await ev(async()=>{const e=document.getElementById('filme-estrategia');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*.75,behavior:'instant'});await new Promise(r=>setTimeout(r,500));return {time:e.querySelector('video').currentTime};});await call('take_screenshot',{filePath:'design/qa/scrolltide-mobile-film.png'});}}
 }
 await call('list_console_messages',{types:['error'],pageSize:30});
}finally{await fs.writeFile(`design/qa/scrolltide-${reduced?'reduced':'review'}.json`,JSON.stringify(results,null,2));await c.close();}
console.log('Completed',results.length,'operations');
