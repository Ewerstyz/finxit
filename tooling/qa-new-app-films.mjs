import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import fs from 'node:fs/promises';
import path from 'node:path';
const client=new Client({name:'new-app-film-review',version:'1.0.0'});
const transport=new StdioClientTransport({command:process.execPath,args:[path.resolve('node_modules/chrome-devtools-mcp/build/src/bin/chrome-devtools-mcp.js'),'--headless','--isolated','--no-usage-statistics','--no-performance-crux','--no-page-id-routing',`--workspace=${process.cwd()}`],stderr:'pipe'});
const results=[];
async function call(name,args={}) {const r=await client.callTool({name,arguments:args});results.push({name,args,result:r});if(r.isError)throw Error(JSON.stringify(r));return r;}
try {
 await client.connect(transport);
 await call('new_page',{url:'http://127.0.0.1:4173/',timeout:20000});
 for(const viewport of ['1440x1000x1','390x844x1']) {
  await call('emulate',{viewport});
  for(const [id,file] of [['experiencia','finxi-app-reports'],['filme-estrategia','finxi-app-assistant']]) {
   for(const p of [.75,.25]) {
    await call('evaluate_script',{function:`async()=>{const e=document.getElementById('${id}');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*${p},behavior:'instant'});await new Promise(r=>setTimeout(r,1200));const v=e.querySelector('video');if(v.getAttribute('src')!='/media/${file}.mp4')throw Error('Wrong film loaded');const initial=v.currentTime;await new Promise(r=>setTimeout(r,250));if(!v.paused||v.autoplay||v.currentTime!==initial||Math.abs(v.currentTime-${p}*v.duration)>.1)throw Error('Scroll seek failed');return {id:'${id}',src:v.getAttribute('src'),time:v.currentTime,duration:v.duration,paused:v.paused,stationary:initial===v.currentTime,overflow:document.documentElement.scrollWidth>innerWidth};}`});
    if(p===.75)await call('take_screenshot',{filePath:`design/qa/new-app-${id}-${viewport}.png`});
   }
  }
 }
 await call('list_console_messages',{types:['error'],pageSize:30});
} finally {await fs.writeFile('design/qa/new-app-film-review.json',JSON.stringify(results,null,2));await client.close();}
console.log('New files and reversible scroll verified');
