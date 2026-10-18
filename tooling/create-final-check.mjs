import fs from 'node:fs';
const src=fs.readFileSync('tooling/review-three-films.mjs','utf8');
const prefix=src.slice(0,src.indexOf('try{'));
fs.writeFileSync('tooling/final-three-films.mjs',prefix+`try{
 await client.connect(transport); await call('new_page',{url:'http://127.0.0.1:4173/',timeout:20000});
 await call('emulate',{viewport:'390x844x1'});
 await evaluate(async()=>{await document.fonts.ready; const e=document.getElementById('filme-registros');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*.75,behavior:'instant'});await new Promise(r=>setTimeout(r,700));return {overflow:document.documentElement.scrollWidth>innerWidth,videoFit:getComputedStyle(e.querySelector('video')).objectFit,currentTime:e.querySelector('video').currentTime};});
 await call('take_screenshot',{filePath:'design/qa/three-films-mobile-scroll-final.png'});
 await call('list_console_messages',{types:['error'],pageSize:30});
 await call('emulate',{viewport:'1440x1000x1'});
 await evaluate(()=>{window.scrollTo({top:0,behavior:'instant'});return {threeDistinctPosters:new Set([...document.querySelectorAll('.film-index img')].map(i=>i.src)).size};});
 await call('take_screenshot',{filePath:'design/qa/three-films-final.png'});
}finally{await fs.writeFile('design/qa/three-films-final.json',JSON.stringify(report,null,2));await client.close();}
console.log('Final visual review complete');`);
