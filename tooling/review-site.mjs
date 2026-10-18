import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "node:fs/promises";
import path from "node:path";

const reduced = process.argv.includes("--reduced");
const client = new Client({
  name: "finxiit-design-validation",
  version: "1.0.0",
});
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
async function evaluate(fn) {
  return call("evaluate_script", { function: fn.toString() });
}
try {
  await fs.mkdir("design/qa", { recursive: true });
  await client.connect(transport);
  await call("new_page", { url: "http://127.0.0.1:5173/", timeout: 20000 });
  await call("resize_page", { width: 1440, height: 1000 });
  await evaluate(async () => {
    await document.fonts.ready;
    await new Promise((r) => setTimeout(r, 800));
    return {
      title: document.title,
      fonts: document.fonts.status,
      images: [...document.images].every(
        (i) => i.complete && i.naturalWidth > 0,
      ),
      reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
      overflow: document.documentElement.scrollWidth > innerWidth,
    };
  });
  if (reduced) {
    await evaluate(() => {
      document.getElementById("experiencia").scrollIntoView();
      return {
        videos: document.querySelectorAll("video").length,
        reducedSection: !!document.querySelector(".story-reduced"),
      };
    });
  } else {
    await call("take_screenshot", {
      filePath: "design/qa/site-final-desktop.png",
    });
    await evaluate(async () => {
      const b = document.querySelector(".film-control");
      if (document.querySelector(".hero-film video").paused) {
        b.click();
        await new Promise((r) => setTimeout(r, 300));
      }
      b.click();
      await new Promise((r) => setTimeout(r, 150));
      return {
        pauseLabel: b.getAttribute("aria-label"),
        paused: document.querySelector(".hero-film video").paused,
      };
    });
    await evaluate(() => {
      document.querySelectorAll("[role=tab]")[0].focus();
      return true;
    });
    await call("press_key", { key: "ArrowRight" });
    await evaluate(async () => {
      await new Promise((r) => setTimeout(r, 150));
      document.querySelector(".question").click();
      await new Promise((r) => setTimeout(r, 150));
      return {
        tab: document.querySelector("[role=tab][aria-selected=true]")
          .textContent,
        answer: document.querySelector(".answer").textContent,
      };
    });
    await evaluate(async () => {
      document.querySelector("[data-slot=accordion-trigger]").click();
      await new Promise((r) => setTimeout(r, 150));
      return {
        faqExpanded: document
          .querySelector("[data-slot=accordion-trigger]")
          .getAttribute("aria-expanded"),
      };
    });
    for (const value of [0.15, 0.75, 0.35]) {
      await call("evaluate_script", {
        function: `async()=>{const el=document.querySelector('.story');const top=el.getBoundingClientRect().top+scrollY;window.scrollTo({top:top+(el.offsetHeight-innerHeight)*${value},behavior:'instant'});await new Promise(r=>setTimeout(r,900));const v=document.querySelector('.story-video');return {progress:${value},time:v?.currentTime,duration:v?.duration,ready:v?.readyState,stage:document.querySelector('.story-step.active h3').textContent};}`,
      });
    }
    await call("take_screenshot", {
      filePath: "design/qa/site-final-scroll.png",
    });
    for (const width of [390, 320, 820]) {
      await call("emulate", { viewport: width + "x844x1" });
      await evaluate(async () => {
        window.scrollTo({ top: 0, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 500));
        return {
          width: innerWidth,
          overflow: document.documentElement.scrollWidth > innerWidth,
          heroWidth: document.querySelector(".hero").getBoundingClientRect()
            .width,
          outside: [...document.querySelectorAll("body *")]
            .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
            .slice(0, 8)
            .map((e) => ({
              tag: e.tagName,
              cls: e.className,
              right: e.getBoundingClientRect().right,
            })),
        };
      });
      if (width === 390) {
        await call("take_screenshot", {
          filePath: "design/qa/site-final-mobile.png",
        });
        await evaluate(async () => {
          const b = document.getElementById("menu-toggle");
          b.click();
          await new Promise((r) => setTimeout(r, 100));
          const open = b.getAttribute("aria-expanded");
          window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
          await new Promise((r) => setTimeout(r, 100));
          return { open, closed: b.getAttribute("aria-expanded") };
        });
      }
    }
    await call("emulate", { viewport: "1440x1000x1" });
    await call("lighthouse_audit", {
      mode: "navigation",
      device: "desktop",
      outputDirPath: "design/qa/lighthouse",
    });
    await call("list_console_messages", { types: ["error"], pageSize: 30 });
  }
} catch (e) {
  report.push({ error: String(e) });
  process.exitCode = 1;
} finally {
  await fs.writeFile(
    `design/qa/${reduced ? "reduced-motion" : "mcp-review"}.json`,
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify(
      report.map((r) => ({
        name: r.name,
        result: r.result?.content?.filter((c) => c.type === "text"),
        error: r.error,
      })),
      null,
      2,
    ),
  );
  await client.close();
}
