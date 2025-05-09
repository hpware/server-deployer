<?php
// Set error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Define deployment directory
$deployDir = "/deploy";

// Function to execute commands and check results
function executeCommand($command, $workDir = null) {
    $fullCommand = $workDir ? "cd {$workDir} && {$command}" : $command;
    exec($fullCommand . " 2>&1", $output, $returnCode);
    
    echo implode("\n", $output) . "\n";
    
    if ($returnCode !== 0) {
        die("Error executing command: {$command}\nExit code: {$returnCode}\n");
    }
    
    return $output;
}

try {
    echo "Starting deployment process...\n";
    
    echo "Fetching latest code from the repository...\n";
    executeCommand("git pull", $deployDir);
    
    echo "Installing dependencies...\n";
    executeCommand("bun install --prod", $deployDir);
    
    echo "Killing old processes...\n";
    executeCommand("pm2 delete all");
    
    echo "Redeploying the application...\n";
    executeCommand("bash server_sys.sh", $deployDir);
    
    echo "Deployment completed successfully!\n";
} catch (Exception $e) {
    echo "Deployment failed: " . $e->getMessage() . "\n";
    exit(1);
}
