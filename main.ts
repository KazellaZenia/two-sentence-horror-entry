// Two-Sentence Horror — a story in exactly two sentences.
//
// The program writes the story to $MAKEFUN_OUTPUT_DIR/entry.txt and
// nothing else. Before writing it checks the story in code: exactly
// two sentences, 1-400 characters, no leading or trailing whitespace.
// If any check fails the program throws instead of writing a bad entry.
//
// The story (232 characters, 2 sentences): a gardener's soil keeps
// returning buttons — and this year they come from the shirt he is
// wearing. Sentence two reframes sentence one: the ground is not
// giving things back, it is taking him apart a piece at a time.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const story =
  "Every spring I dig the same bed for tomatoes, and every spring the soil gives back one small white button, clean as the day it was sewn on. " +
  "This year it gave back seven, and every one of them is from the shirt I put on this morning.";

const sentences = story.split(/(?<=[.!?])\s+/).filter((s) => s.length > 0);
if (sentences.length !== 2) {
  throw new Error(`expected exactly 2 sentences, got ${sentences.length}`);
}
if (story.length < 1 || story.length > 400) {
  throw new Error(`expected 1-400 characters, got ${story.length}`);
}
if (story !== story.trim()) {
  throw new Error("story has leading or trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, story, "utf8");

// Read it back to prove what is on disk is exactly the story.
const written = readFileSync(outPath, "utf8");
if (written !== story) {
  throw new Error("entry.txt on disk does not match the story");
}
console.log(`wrote ${story.length} characters, ${sentences.length} sentences to ${outPath}`);
