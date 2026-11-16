#!/usr/bin/env node
'use strict';

const { spawnSync } = require('node:child_process');

function run(args) {
  const result = spawnSync('omp', args, { stdio: 'inherit' });
  if (result.error) {
    console.error(`Could not run omp: ${result.error.message}. Install OMP and ensure it is on PATH.`);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

run(['plugin', 'marketplace', 'add', 'Snazzie/ai-skills-n-stuff']);
run(['plugin', 'install', 'snazzies-omp-backup@snazzies-ai-skills-n-stuff']);
console.log('Restart or reload OMP if needed to discover the skills.');
