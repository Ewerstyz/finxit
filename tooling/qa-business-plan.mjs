import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "node:fs/promises";
import path from "node:path";

const client = new Client({
  name: "finxi-business-plan-review",
  version: "1.0.0",
});
const report = [];
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [
    path.resolve(
      "node_modules/chrome-devtools-mcp/build/src/bin/chrome-devtools-mcp.js",
    ),
    "--headless",
    "--isolated",
    "--no-usage-statistics",
    "--no-performance-crux",
    "--no-page-id-routing",
    `--workspace=${process.cwd()}`,
  ],
  stderr: "pipe",
});
async function call(name, args = {}) {
  const result = await client.callTool({ name, arguments: args });
  report.push({ name, args, result });
  if (result.isError) throw Error(JSON.stringify(result));
  return result;
}
const ev = (fn) => call("evaluate_script", { function: fn });
try {
  await client.connect(transport);
  await call("new_page", {
    url: "http://127.0.0.1:4173/?version=business-plan-20261018",
    timeout: 20000,
  });
  for (const viewport of [
    "1440x1000x1",
    "768x1024x1",
    "390x844x1",
    "320x740x1",
  ]) {
    await call("emulate", { viewport });
    await ev(
      `async()=>{await document.fonts.ready;for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));if([...document.images].some(i=>!i.naturalWidth))throw Error('Image missing');if(document.querySelectorAll('h1').length!==1)throw Error('Heading hierarchy');const body=document.body.innerText;for(const text of ['Simplicidade','Inclusão','Confiança','Respeito ao usuário','Luis Guilherme Lemos Fim','Erisson Pereira Dordenoni','Issac da Silva Rodrigues','6 de 12','7 de 12','Pesquisa exploratória','39,90','59,90','Protótipo atual','Evolução prevista'])if(!body.includes(text))throw Error('Plan content missing: '+text);if(!document.querySelector('a[href*="61-dos-empreendedores"]'))throw Error('Sebrae source missing');if(document.querySelectorAll('.team-grid article').length!==3||document.querySelectorAll('.research-grid article').length!==3||document.querySelectorAll('.plan-card').length!==2)throw Error('Incomplete sections');if(document.querySelectorAll('.brand-origin').length!==1)throw Error('Brand story');return {viewport:innerWidth,team:3,research:3,plans:2};}`,
    );
    for (const id of [
      "empresa",
      "equipe",
      "para-quem",
      "recursos",
      "inteligencia",
      "evolucao",
      "planos",
      "download",
    ]) {
      await ev(
        `async()=>{const e=document.getElementById('${id}');e.scrollIntoView({behavior:'instant',block:'start'});await new Promise(r=>setTimeout(r,120));if(document.documentElement.scrollWidth>innerWidth)throw Error('Overflow at ${id}');for(const card of e.querySelectorAll('article,.brand-origin,.research-grid')){const b=card.getBoundingClientRect();if(b.left<-.5||b.right>innerWidth+.5)throw Error('Clipped content ${id}');}return {section:'${id}',width:innerWidth};}`,
      );
      if (
        ["1440x1000x1", "390x844x1"].includes(viewport) &&
        ["empresa", "equipe", "para-quem", "planos"].includes(id)
      )
        await call("take_screenshot", {
          filePath: `design/qa/business-plan-${id}-${viewport}.png`,
        });
    }
  }
  await ev(
    `async()=>{document.getElementById('inteligencia').scrollIntoView({behavior:'instant'});const b=[...document.querySelectorAll('.ai-details button')].find(x=>x.textContent.includes('Como separam'));b.click();await new Promise(r=>setTimeout(r,200));const t=document.querySelector('.ai-details').innerText;if(!t.includes('Regras verificáveis')||!t.includes('IA como copiloto')||t.includes('Groq')||t.includes('NVIDIA')||t.includes('Cloudflare'))throw Error('Unsupported AI claim');return {aiBoundaries:true};}`,
  );
  await ev(
    `async()=>{document.getElementById('download').scrollIntoView({behavior:'instant'});const b=document.querySelector('#download button');if(b){b.click();await new Promise(r=>setTimeout(r,100));if(!document.querySelector('.download-status').textContent.includes('link oficial'))throw Error('Download placeholder');}if([...document.querySelectorAll('.plans-section a,.plans-section button')].some(x=>/comprar|assinar agora/i.test(x.textContent)))throw Error('Unlaunched checkout');return {downloadAndPlans:true};}`,
  );
  const messages = await call("list_console_messages", {
    types: ["error"],
    pageSize: 30,
  });
  if (
    messages.content.some((x) => x.type === "text" && x.text.includes("msgid="))
  )
    throw Error("Console errors");
  for (const filename of await fs.readdir("dist/assets")) {
    if (!filename.endsWith(".js")) continue;
    const text = await fs.readFile(path.join("dist/assets", filename), "utf8");
    for (const confidential of [
      "R$ 100 mil",
      "20% de participação",
      "85.536",
      "pró-labore",
      "15.222,40",
    ])
      if (text.includes(confidential))
        throw Error("Internal business-plan content bundled");
  }
  console.log("Business plan content and responsive review passed");
} finally {
  await fs.writeFile(
    "design/qa/business-plan.json",
    JSON.stringify(report, null, 2),
  );
  await client.close();
}
