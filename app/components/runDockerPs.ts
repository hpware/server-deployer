import { spawn } from "child_process";

const runDeployCommand = async (app: string) => {
    return new ReadableStream({
        start(controller) {
            const erdfi = spawn("bash", [`${process.cwd()}/scripts/dockerps.sh`]);

            erdfi.stdout.on("data", (data) => {
                controller.enqueue(`${data}\n`);
            });

            erdfi.stderr.on("data", (data) => {
                controller.enqueue(`${data}\n`);
            });

            erdfi.on("close", () => {
                controller.close();
            });

            erdfi.on("error", (err) => {
                controller.error(err);
            });
        }
    });
};

export default runDeployCommand;