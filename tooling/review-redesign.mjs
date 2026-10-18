import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "node:fs/promises";
import path from "node:path";
const reduced = process.argv.includes("--reduced");
const client = new Client({ name: "finxiit-scroll-review", version: "2.0.0" });
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
    ...(reduced ? ["--chromeArg=--force-prefers-reduced-motion"] : []),
  ],
  stderr: "pipe",
});
const report = [];
async function call(name, args = {}) {
  const r = await client.callTool({ name, arguments: args });
  report.push({ name, args, result: r });
  if (r.isError) throw Error(JSON.stringify(r));
  return r;
}
const evaluate = (fn) => call("evaluate_script", { function: fn.toString() });
try {
  await client.connect(transport);
  await call("new_page", { url: "http://127.0.0.1:5173/", timeout: 20000 });
  await call("emulate", { viewport: "1440x1000x1" });
  await evaluate(async () => {
    await document.fonts.ready;
    await new Promise((r) => setTimeout(r, 800));
    return {
      title: document.title,
      overflow: document.documentElement.scrollWidth > innerWidth,
    };
  });
  await call("take_screenshot", {
    filePath: reduced
      ? "design/qa/redesign-reduced.png"
      : "design/qa/redesign-desktop.png",
  });
  if (reduced) {
    await evaluate(() => ({
      reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
      videos: document.querySelectorAll("video").length,
      static: !!document.querySelector(".story-static"),
      chapters: document.querySelectorAll(".static-chapters h2").length,
    }));
  } else {
    for (const p of [0.05, 0.5, 0.95, 0.25]) {
      await call("evaluate_script", {
        function: `async()=>{const e=document.querySelector('.product-story');window.scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*${p},behavior:'instant'});await new Promise(r=>setTimeout(r,900));const v=document.querySelector('.product-film video');return {progress:${p},time:v.currentTime,duration:v.duration,paused:v.paused,autoplay:v.autoplay,position:getComputedStyle(v).position,chapter:document.querySelector('.chapter-copy h2').textContent};}`,
      });
      await call("take_screenshot", {
        filePath: `design/qa/redesign-scroll-${p}.png`,
      });
    }
    await evaluate(async () => {
      const v = document.querySelector("video");
      const before = v.currentTime;
      await new Promise((r) => setTimeout(r, 1200));
      return {
        stationaryBefore: before,
        stationaryAfter: v.currentTime,
        staysPaused: v.paused && Math.abs(before - v.currentTime) < 0.05,
      };
    });
    await evaluate(() => {
      document.querySelector("[role=tab]").focus();
      return { firstTab: document.activeElement.textContent };
    });
    await call("press_key", { key: "ArrowRight" });
    await evaluate(() => ({
      selectedTab: document.querySelector("[role=tab][aria-selected=true]")
        .textContent,
    }));
    await evaluate(async () => {
      document.querySelector(".question").click();
      document.querySelector(".faqs button").click();
      await new Promise((r) => setTimeout(r, 150));
      return {
        answer: document.querySelector(".answer").textContent,
        faqExpanded: document
          .querySelector(".faqs button")
          .getAttribute("aria-expanded"),
      };
    });
    await evaluate(() => {
      document.querySelector("#rotina").scrollIntoView({ behavior: "instant" });
      return true;
    });
    await call("take_screenshot", {
      filePath: "design/qa/redesign-product.png",
    });
    for (const width of [820, 390, 320]) {
      await call("emulate", { viewport: `${width}x844x1` });
      await evaluate(async () => {
        window.scrollTo({ top: 0, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 250));
        return {
          width: innerWidth,
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      if (width === 390) {
        await call("take_screenshot", {
          filePath: "design/qa/redesign-mobile.png",
        });
        await evaluate(async () => {
          const e = document.querySelector(".product-story");
          window.scrollTo({
            top:
              e.getBoundingClientRect().top +
              scrollY +
              (e.offsetHeight - innerHeight) * 0.7,
            behavior: "instant",
          });
          await new Promise((r) => setTimeout(r, 600));
          return { videoTime: document.querySelector("video").currentTime };
        });
        await call("take_screenshot", {
          filePath: "design/qa/redesign-scroll-mobile.png",
        });
        await evaluate(async () => {
          window.scrollTo({ top: 0, behavior: "instant" });
          document.querySelector("#menu-toggle").click();
          await new Promise((r) => setTimeout(r, 100));
          return {
            menuExpanded: document
              .querySelector("#menu-toggle")
              .getAttribute("aria-expanded"),
          };
        });
        await call("press_key", { key: "Escape" });
      }
    }
    await call("emulate", { viewport: "1440x1000x1" });
    await call("lighthouse_audit", {
      mode: "navigation",
      device: "desktop",
      outputDirPath: "design/qa/lighthouse-redesign",
    });
  }
  await call("list_console_messages", { types: ["error"], pageSize: 30 });
} finally {
  await fs.writeFile(
    `design/qa/redesign-${reduced ? "reduced" : "review"}.json`,
    JSON.stringify(report, null, 2),
  );
  await client.close();
}
console.log("Completed", report.length, "Chrome DevTools MCP operations");
