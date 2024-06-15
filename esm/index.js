#!/usr/bin/env bun
// @bun

// lib/index.ts
import * as fs from "fs/promises";
import path from "path";
var {$ } = globalThis.Bun;
async function start() {
  const pkgString = (await fs.readFile(p("package.json"), "utf8")).toString();
  const pkg = JSON.parse(pkgString);
  const githubDependencies = pkg.githubDependencies || {};
  const awayGithubDependencies = (process.env.AWAY_GITHUB_DEPENDENCIES || "").split(",");
  let isGithub = false;
  let isLink = false;
  const args = process.argv.slice(2);
  if (args.includes("--github")) {
    isGithub = true;
  }
  if (args.includes("--link")) {
    isLink = true;
  }
  let changed = false;
  ["dependencies", "devDependencies"].forEach((depsKey) => {
    const deps = pkg[depsKey];
    Object.keys(deps).forEach((key) => {
      if (!githubDependencies[key]) {
        return;
      }
      if (isGithub && deps[key] !== githubDependencies[key]) {
        changed = true;
        deps[key] = githubDependencies[key];
      }
      if (isLink && deps[key] !== `link:${key}`) {
        changed = true;
        deps[key] = `link:${key}`;
      }
      if (awayGithubDependencies.includes(key) && deps[key] !== githubDependencies[key]) {
        changed = true;
        deps[key] = githubDependencies[key];
      }
    });
    pkg[depsKey] = deps;
  });
  if (!changed) {
    console.log("Nothing changed");
    process.exit(0);
  }
  await fs.writeFile(p("package.json"), JSON.stringify(pkg, null, 2));
  if (changed) {
    await $`bun update`;
  }
}
var p = (...args) => path.resolve(process.cwd(), ...args);
start();

//# debugId=FED0368D68EE84F664756e2164756e21
