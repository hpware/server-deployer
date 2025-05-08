bun install --prod
pm2 start app/index.ts --interpreter $(which bun) --name "server-deployer"
bun run app/providePort.ts