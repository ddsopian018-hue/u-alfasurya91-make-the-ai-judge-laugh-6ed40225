// The Two-Hour Quick Sync — a meeting-minutes punchline.
//
// One joke about office life, written to be read aloud in one breath:
// a boss who calls every meeting a "quick sync", a stopwatch, and the
// silent rebellion of everyone doing their real work in other tabs.
// The gate requires UTF-8 text of 1 to 200 characters, so the line is
// guarded at runtime and the program exits non-zero if it ever drifts
// outside that window.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE: string =
  "My boss calls every meeting a 'quick sync', so I started timing them: " +
  "the record is two hours flat, and the only thing we actually synced " +
  "was everyone's silent decision to do real work in other tabs.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function main(): void {
  const length = [...JOKE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `joke must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${length}`,
    );
  }
  if (JOKE.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDir, { recursive: true });
  const outPath = join(outputDir, "entry.txt");
  writeFileSync(outPath, JOKE, "utf8");
  // Read the artifact back: the file on disk must be exactly the joke,
  // byte for byte, or the run has not produced a valid entry.
  const written = readFileSync(outPath, "utf8");
  if (written !== JOKE) {
    throw new Error("entry.txt on disk does not match the joke");
  }
}

main();
