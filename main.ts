import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The repository root is derived from this file's own location, so the
// entrypoint works no matter which directory the grader invokes it from.
const repoRoot = dirname(fileURLToPath(import.meta.url));
void repoRoot;

// One line: the diagnosis an AI therapist hands its human. The clinical
// label lands first, the human habit second, and the reversal — the
// microwave out-hearing the human's own name — closes the line.
const entry =
  "Diagnosis: selective hearing, self-inflicted. You heard the microwave from two rooms away but not your name three times.";

// The gate only accepts 1 to 200 characters of UTF-8 text on a single
// line, so refuse loudly instead of ever writing an entry the scorer
// would reject.
if (entry.length < 1 || entry.length > 200) {
  throw new Error(
    `entry is ${entry.length} characters, outside the 1-200 gate`,
  );
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
