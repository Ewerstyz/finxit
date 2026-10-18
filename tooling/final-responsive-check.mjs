import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "node:fs/promises";
import path from "node:path";
const c = new Client({ name: "finxiit-responsive-check", version: "1.0.0" });
const t = new StdioClientTransport({
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
const result = [];
async function run(name, args) {
  const r = await c.callTool({ name, arguments: args });
  result.push({ name, args, result: r });
  return r;
}
try {
  await c.connect(t);
  await run("new_page", { url: "http://127.0.0.1:5173/" });
  for (const width of [820, 390, 320]) {
    await run("emulate", { viewport: width + "x844x1" });
    await run("evaluate_script", {
      function:
        'async()=>{window.scrollTo({top:0,behavior:"instant"});await document.fonts.ready;await new Promise(r=>setTimeout(r,300));return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth};}',
    });
    if (width === 390) {
      await run("take_screenshot", {
        filePath: "design/qa/site-final-mobile.png",
      });
      await run("evaluate_script", {
        function:
          'async()=>{const s=document.getElementById("experiencia");window.scrollTo({top:s.getBoundingClientRect().top+scrollY+200,behavior:"instant"});await new Promise(r=>setTimeout(r,500));return {width:innerWidth,time:document.querySelector(".story-video")?.currentTime};}',
      });
      await run("take_screenshot", {
        filePath: "design/qa/site-final-scroll-mobile.png",
      });
    }
  }
} finally {
  await fs.writeFile(
    "design/qa/responsive-final.json",
    JSON.stringify(result, null, 2),
  );
  console.log(
    JSON.stringify(
      result.map((x) => x.result.content),
      null,
      2,
    ),
  );
  await c.close();
}
