import fs from 'node:fs/promises';
const source=await fs.readFile('referência/mapas/brasil-ibge.svg','utf8');
const paths=[...source.matchAll(/<path\b[^>]*\bd="([^"]+)"[^>]*\/>/g)].map(m=>m[1]);
if(!paths.length)throw Error('Missing IBGE outline');
await fs.writeFile('src/cinematic/brasil-outline.json',JSON.stringify(paths));
console.log({paths:paths.length});
