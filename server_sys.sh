#!/bin/bash
echo "Installing dependencies..."
bun install --prod >> /dev/null 2>&1
echo "Creating database Stuff..."
bun run app/createDatabase.ts # >> /dev/null 2>&1
echo "Starting server..."
pm2 start app/index.ts --interpreter $(which bun) --name "server-deployer"
bun run app/providePort.ts