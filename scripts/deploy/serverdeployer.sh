#!/bin/bash
echo Pulling from GitHub
git pull
echo "!!! Impportant !!! This server will be offline for a while."
echo "Killing old process"
pm2 stop server-deployer
sleep 3 
echo "Deploying server..."
echo "Installing dependencies..."
bun install --prod >> /dev/null 2>&1
echo "Starting server..."
pm2 start "bun start" --name "server-deployer"
bun run app/providePort.ts
