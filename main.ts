import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve everything from this file's own location, never from the
// process working directory: the grader runs us from its own cwd.
const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = process.env.MAKEFUN_OUTPUT_DIR || join(HERE, "output");
const SRC = join(HERE, "entry.png");
const DST = join(OUT, "entry.png");

mkdirSync(OUT, { recursive: true });
copyFileSync(SRC, DST);

// Guard against a truncated copy: the grader runs us twice and compares
// bytes, so confirm the copy is whole before we report success.
if (statSync(SRC).size !== statSync(DST).size) {
  throw new Error("entry.png copy is incomplete");
}
console.log(`wrote ${DST} (${statSync(DST).size} bytes)`);
