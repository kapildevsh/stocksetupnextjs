#!/usr/bin/env bash
# One-command deploy: pull latest code, install deps, rebuild, restart.
# Run from the VPS inside the repo's own directory: bash deploy.sh
set -euo pipefail
cd "$(dirname "$0")"

git pull origin main
npm install
npm run build
pm2 restart stocksetup
