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
 await client.connect(transport); await call('new_page',{url:'http://127.0.0.1:4173/',timeout:20000});
 await call('emulate',{viewport:'390x844x1'});
 await evaluate(async()=>{await document.fonts.ready; const e=document.getElementById('filme-registros');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*.75,behavior:'instant'});await new Promise(r=>setTimeout(r,700));return {overflow:document.documentElement.scrollWidth>innerWidth,videoFit:getComputedStyle(e.querySelector('video')).objectFit,currentTime:e.querySelector('video').currentTime};});
 await call('take_screenshot',{filePath:'design/qa/three-films-mobile-scroll-final.png'});
 await call('list_console_messages',{types:['error'],pageSize:30});
 await call('emulate',{viewport:'1440x1000x1'});
 await evaluate(()=>{window.scrollTo({top:0,behavior:'instant'});return {threeDistinctPosters:new Set([...document.querySelectorAll('.film-index img')].map(i=>i.src)).size};});
 await call('take_screenshot',{filePath:'design/qa/three-films-final.png'});
}finally{await fs.writeFile('design/qa/three-films-final.json',JSON.stringify(report,null,2));await client.close();}
console.log('Final visual review complete');