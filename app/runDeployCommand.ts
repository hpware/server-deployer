import { spawn } from "child_process";

const runDeployCommand = async (app: string) => {
    return new ReadableStream({
        start(controller) {
            const erdfi = spawn("bash", [`${process.cwd()}/scripts/${app}.sh`]);

            erdfi.stdout.on("data", (data) => {
                controller.enqueue(`data: ${data}\n\n`);
            });

            erdfi.stderr.on("data", (data) => {
                controller.enqueue(`data: ${data}\n\n`);
            });

            erdfi.on("close", (code) => {
                controller.enqueue(`data: Process exited with code ${code}\n\n`);
                controller.close();
            });

            erdfi.on("error", (err) => {
                controller.error(err);
            });
        }
    });
};

export default runDeployCommand;