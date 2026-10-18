import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
import fs from 'node:fs/promises'; import path from 'node:path';
const c=new Client({name:'finxi-final',version:'1.0.0'});
const t=new StdioClientTransport({command:process.execPath,args:[path.resolve('node_modules/chrome-devtools-mcp/build/src/bin/chrome-devtools-mcp.js'),'--headless','--isolated','--no-usage-statistics','--no-performance-crux','--no-page-id-routing',`--workspace=${process.cwd()}`],stderr:'pipe'});
const results=[];
async function call(name,args={}){const r=await c.callTool({name,arguments:args});results.push({name,args,result:r});if(r.isError)throw Error(JSON.stringify(r));return r;}
const ev=fn=>call('evaluate_script',{function:fn.toString()});
try{
 await c.connect(t);await call('new_page',{url:'http://127.0.0.1:4173/',timeout:20000});
 await call('emulate',{viewport:'1440x1240x1'});
 await ev(async()=>{await document.fonts.ready;return true;});
 await call('take_screenshot',{filePath:'design/qa/hera-final.png'});
 await ev(()=>{document.querySelectorAll('.connection-tabs [role=tab]')[2].focus();return true;});
 await call('press_key',{key:'Enter'});
 await ev(()=>({selected:document.querySelector('.connection-tabs [aria-selected=true]').textContent,result:document.querySelector('.connected-result').innerText}));
 await call('emulate',{viewport:'390x844x1'});
 await ev(()=>{document.querySelector('.menu-toggle').focus();return true;});
 await call('press_key',{key:'Enter'});
 await ev(()=>({open:document.querySelector('.menu-toggle').getAttribute('aria-expanded'),visible:getComputedStyle(document.getElementById('main-nav')).display}));
 await call('press_key',{key:'Escape'});
 await ev(()=>({closed:document.querySelector('.menu-toggle').getAttribute('aria-expanded'),focused:document.activeElement.className}));
 await ev(()=>{document.activeElement.blur();window.scrollTo({top:0,behavior:'instant'});return true;});
 await call('take_screenshot',{filePath:'design/qa/hera-mobile-final.png'});
 await call('list_console_messages',{types:['error'],pageSize:30});
}finally{await fs.writeFile('design/qa/hera-final.json',JSON.stringify(results,null,2));await c.close();}
console.log('Final verification complete');
