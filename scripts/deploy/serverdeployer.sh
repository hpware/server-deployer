#!/bin/bash
echo Pulling from GitHub
git pull
echo "!!! Impportant !!! This server will be offline for a 3s."
sleep 3
echo "Deploying server..."
pm2 restart server-deployer
echo "Starting server..."