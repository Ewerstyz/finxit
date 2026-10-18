import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
import fs from 'node:fs/promises';import path from 'node:path';
const reduced=process.argv.includes('--reduced');
const client=new Client({name:'finxiit-three-films',version:'1.0.0'});
const transport=new StdioClientTransport({command:process.execPath,args:[path.resolve('node_modules/chrome-devtools-mcp/build/src/bin/chrome-devtools-mcp.js'),'--headless','--isolated','--no-usage-statistics','--no-performance-crux','--no-page-id-routing',`--workspace=${process.cwd()}`,...(reduced?['--chromeArg=--force-prefers-reduced-motion']:[])],stderr:'pipe'});
const report=[];
async function call(name,args={}){const r=await client.callTool({name,arguments:args});report.push({name,args,result:r});if(r.isError)throw Error(JSON.stringify(r));return r;}
const evaluate=fn=>call('evaluate_script',{function:fn.toString()});
try{
 await client.connect(transport);await call('new_page',{url:'http://127.0.0.1:4173/',timeout:20000});await call('emulate',{viewport:'1440x1000x1'});
 await evaluate(async()=>{await document.fonts.ready;await new Promise(r=>setTimeout(r,400));return {sections:[...document.querySelectorAll('.product-story')].map(e=>e.id),index:document.querySelectorAll('.film-index a').length,words:document.body.innerText.split(/\s+/).length,overflow:document.documentElement.scrollWidth>innerWidth};});
 if(reduced){
  await evaluate(()=>({reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,videoCount:document.querySelectorAll('video').length,staticScenes:document.querySelectorAll('.story-static').length,chapters:document.querySelectorAll('.static-chapters h2').length,heights:[...document.querySelectorAll('.story-static')].map(e=>e.offsetHeight)}));
 }else{
  await call('take_screenshot',{filePath:'design/qa/three-films-desktop.png'});
  for(const id of ['experiencia','filme-registros','filme-planejamento']){
   for(const p of [.75,.25]){
    await call('evaluate_script',{function:`async()=>{const e=document.getElementById('${id}');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*${p},behavior:'instant'});await new Promise(r=>setTimeout(r,900));const v=e.querySelector('video');const initial=v.currentTime;await new Promise(r=>setTimeout(r,250));return {id:'${id}',progress:${p},src:v.getAttribute('src'),time:v.currentTime,duration:v.duration,stationary:initial===v.currentTime,paused:v.paused,autoplay:v.autoplay,ready:v.readyState};}`});
    if(p===.75)await call('take_screenshot',{filePath:`design/qa/three-films-${id}.png`});
   }
  }
  await evaluate(()=>{document.querySelector('#diagnostico').scrollIntoView({behavior:'instant'});return true;});await call('take_screenshot',{filePath:'design/qa/three-films-diagnostico.png'});
  await evaluate(()=>{document.querySelectorAll('[role=tab]')[0].focus();return true;});await call('press_key',{key:'ArrowRight'});
  await evaluate(()=>({tab:document.querySelector('[role=tab][aria-selected=true]').textContent,depth:document.querySelector('.module-depth').innerText}));
  await call('take_screenshot',{filePath:'design/qa/three-films-modulos.png'});
  await evaluate(async()=>{document.querySelectorAll('.faqs button')[1].click();await new Promise(r=>setTimeout(r,100));return {faqExpanded:document.querySelectorAll('.faqs button')[1].getAttribute('aria-expanded'),faqText:document.querySelector('.faqs [data-state=open]').innerText};});
  for(const width of [820,390,320]){
   await call('emulate',{viewport:`${width}x844x1`});
   await evaluate(async()=>{window.scrollTo({top:0,behavior:'instant'});await new Promise(r=>setTimeout(r,250));return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth};});
   if(width===390){await call('take_screenshot',{filePath:'design/qa/three-films-mobile.png'});await evaluate(async()=>{const e=document.getElementById('filme-registros');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*.75,behavior:'instant'});await new Promise(r=>setTimeout(r,500));return {time:e.querySelector('video').currentTime};});await call('take_screenshot',{filePath:'design/qa/three-films-mobile-scroll.png'});}
  }
  await call('emulate',{viewport:'1440x1000x1'});await call('lighthouse_audit',{mode:'navigation',device:'desktop',outputDirPath:'design/qa/lighthouse-three-films'});
 }
 await call('list_console_messages',{types:['error'],pageSize:30});
}finally{await fs.writeFile(`design/qa/three-films-${reduced?'reduced':'review'}.json`,JSON.stringify(report,null,2));await client.close();}
console.log('Completed',report.length,'MCP operations');

