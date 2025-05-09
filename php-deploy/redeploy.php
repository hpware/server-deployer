<?php
shell_exec("cd /deploy");
echp "Fetching latest code from the repository...\n";
shell_exec('git pull origin main');
echo "Installing dependencies...\n";
shell_exec("bun install --prod");
echo "Killing old processes...\n";
shell_exec("pm2 delete all");
echo "Redeploying the application...\n";
shell_exec("bash server_sys.sh");