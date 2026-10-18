import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
import fs from 'node:fs/promises';
import path from 'node:path';
const client=new Client({name:'finxi-tech-transitions',version:'1.0'});
const reports=[];
async function call(name,args){const result=await client.callTool({name,arguments:args});reports.push({name,args,result});if(result.isError)throw Error(JSON.stringify(result));return result;}
try{
 await client.connect(new StdioClientTransport({command:process.execPath,args:[path.resolve('node_modules/chrome-devtools-mcp/build/src/bin/chrome-devtools-mcp.js'),'--headless','--isolated','--no-usage-statistics','--no-performance-crux','--no-page-id-routing',`--workspace=${process.cwd()}`],stderr:'pipe'}));
 await call('new_page',{url:'http://127.0.0.1:4173/',timeout:20000});
 for(const viewport of ['1440x1000x1','390x844x1']){
  await call('emulate',{viewport});
  for(const p of [0,.44,.53,.82,.93,.15]){
   await call('evaluate_script',{function:`async()=>{await document.fonts.ready;const rig=document.getElementById('inicio');window.scrollTo({top:(rig.offsetHeight-innerHeight)*${p},behavior:'instant'});await new Promise(r=>setTimeout(r,250));if(document.querySelector('input[type=range],.journey-progress-track'))throw Error('Bars remain');const frames=[...document.querySelectorAll('.journey-image')].map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e),fx=parseFloat(s.getPropertyValue('--focal-x'))/100,fy=parseFloat(s.getPropertyValue('--focal-y'))/100;return {cls:e.className,opacity:Number(s.opacity),x:r.x+r.width*fx,y:r.y+r.height*fy,mask:s.maskImage};});const y=innerHeight*(innerWidth<=600?.31:.55);if(frames.some(f=>Math.abs(f.x-innerWidth*.79)>2||Math.abs(f.y-y)>2))throw Error('Unaligned focal points '+JSON.stringify(frames));if(document.documentElement.scrollWidth>innerWidth)throw Error('Overflow');return {p:${p},frames};}`});
   if([0,.44,.82].includes(p))await call('take_screenshot',{filePath:`design/qa/technology-transition-${p}-${viewport}.png`});
  }
  await call('evaluate_script',{function:`async()=>{document.querySelector('.brazil-network').scrollIntoView({behavior:'instant',block:'center'});await new Promise(r=>setTimeout(r,100));const svg=document.querySelector('.brazil-network');const box=svg.getBoundingClientRect();const labels=[...svg.querySelectorAll('.region-label')].map(e=>({text:e.textContent,bounds:e.getBoundingClientRect().toJSON()}));if(labels.some(l=>l.bounds.x<box.x||l.bounds.right>box.right))throw Error('Map labels clipped');return {width:box.width,labels};}`});
  await call('take_screenshot',{filePath:`design/qa/technology-map-${viewport}.png`});
 }
 await call('list_console_messages',{types:['error'],pageSize:30});
}catch(e){console.error(e);process.exitCode=1;}finally{await fs.writeFile('design/qa/technology-transitions.json',JSON.stringify(reports,null,2));await client.close();}
