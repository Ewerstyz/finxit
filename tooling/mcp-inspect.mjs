import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "node:fs/promises";
import path from "node:path";
const client = new Client({ name: "finxiit-local-review", version: "1.0.0" });
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
try {
  await client.connect(transport);
  const result = await client.listTools();
  await fs.writeFile("tooling/mcp-tools.json", JSON.stringify(result, null, 2));
  console.log(
    result.tools.map((t) => ({ name: t.name, inputSchema: t.inputSchema })),
  );
} finally {
  await client.close();
}
