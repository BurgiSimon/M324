#!/usr/bin/env node
import { execSync } from "child_process";

function sh(cmd) {
  return execSync(cmd, { stdio: ["ignore", "pipe", "pipe"] }).toString().trim();
}

const CC = /^(?<type>feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert)(\(.+\))?(?<bang>!)?:\s(?<desc>.+)$/;

function lastTag() {
  try { return sh("git describe --tags --abbrev=0"); } catch { return null; }
}
function commitsSince(tag) {
  const range = tag ? `${tag}..HEAD` : "HEAD";
  const raw = sh(`git log --pretty=format:%s ${range}`);
  return raw ? raw.split("\n").filter(Boolean) : [];
}
function maxBump(commits) {
  let bump = null;
  for (const subject of commits) {
    const m = subject.match(CC);
    if (!m) continue;
    const { type, bang, desc } = m.groups;
    const breaking = !!bang || /BREAKING CHANGE:/i.test(desc) || /BREAKING-CHANGE:/i.test(desc);
    if (breaking) return "major";
    if (type === "feat") bump = bump ?? "minor";
    else bump = bump ?? "patch";
  }
  return bump; // null => keine passenden CC-Commits
}
function inc(base, bump) {
  const v = base.replace(/^v/, "");
  let [maj, min, pat] = v.split(".").map((n) => parseInt(n || "0", 10));
  if ([maj, min, pat].some(Number.isNaN)) [maj, min, pat] = [0, 1, 0];
  if (bump === "major") { maj++; min = 0; pat = 0; }
  else if (bump === "minor") { min++; pat = 0; }
  else { pat++; }
  return `${maj}.${min}.${pat}`;
}

function main() {
  const tag = lastTag();               // e.g. v1.2.3
  const commits = commitsSince(tag);
  const bump = maxBump(commits);
  const base = tag ? tag.replace(/^v/, "") : "0.1.0";
  const next = bump ? inc(base, bump) : base;
  process.stdout.write(next);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
