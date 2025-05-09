#!/bin/bash

# Configuration
DEPLOY_SCRIPT="deploy.php"
APP_DIR="/path/to/your/app"

echo "Pulling from GitHub..."
git pull

echo "!!! Important !!! This server will be offline for a while."

# Run PHP deployment script
if [ -f "$DEPLOY_SCRIPT" ]; then
    echo "Running deployment script..."
    php "$DEPLOY_SCRIPT"
else
    echo "Error: $DEPLOY_SCRIPT not found!"
    exit 1
fi

echo "Installing Bun dependencies..."
bun install --prod >> /dev/null 2>&1

echo "Starting Bun server..."
pm2 stop server-deployer
sleep 3
pm2 start "bun start" --name "server-deployer"

# Run the port provider
bun run app/providePort.ts