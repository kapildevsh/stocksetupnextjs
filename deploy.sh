#!/usr/bin/env bash
# One-command deploy: pull latest code, install deps, rebuild, restart.
# Run from the VPS inside the repo's own directory: bash deploy.sh
set -euo pipefail
cd "$(dirname "$0")"

git pull origin main
npm install
npm run build

# output: 'standalone' build doesn't include static assets by default —
# the standalone server needs these copied in alongside it each time.
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

pm2 restart stocksetup
