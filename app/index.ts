import { file, randomUUIDv7 } from "bun";
import runDeployCommand from "./components/runDeployCommand";
import runDockerPs from "./components/runDockerPs";
import checkToken from "./components/checkToken";
import sql from "./components/postgres.ts";


const F404 = await file("./app/assets/404.html").text();

Bun.serve({
  port: Number(process.env.SERVER_PORT || 55330),
  development: false,
  routes: {
    "/application/:app/deploy": async (req) => {
        const app = req.params.app;
        const url = new URL(req.url);
        const token = url.searchParams.get("token") || undefined;
        if (token === undefined) {
            return new Response("Missing token", { status: 400 });
        }
        const checkk = await checkToken(token);
        if (!checkk) {
            return new Response("Invalid token", { status: 401 });
        }
        const stream = await runDeployCommand(app);
        return new Response(stream, {
            status: 200,
            headers: { "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "charset": "utf-8",
                "Access-Control-Allow-Origin": "*",
             },
          })
    },
    "/docker/containers": async (req) => {
      const url = new URL(req.url);
      const token = url.searchParams.get("token") || undefined;
      if (token === undefined) {
          return new Response("Missing token", { status: 400 });
      }
      const checkk = await checkToken(token);
      if (!checkk) {
          return new Response("Invalid token", { status: 401 });
      }
      const stream = await runDockerPs();
      return new Response(stream, {
        status: 200,
        headers: { "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "charset": "utf-8",
          "Access-Control-Allow-Origin": "*",
       },
      });
    },
    "/generate-key": async (req) => {
      const url = new URL(req.url);
      const token = url.searchParams.get("token") || undefined;
      if (token === undefined) {
          return new Response("Missing token", { status: 400 });
      }
      const checkk = await checkToken(token);
      if (!checkk) {
          return new Response("Invalid token", { status: 401 });
      }
      const key = randomUUIDv7();

      const saveKey = await sql`INSERT INTO tokens (token) VALUES (${key});`;
      
            return new Response("Key Generated! Please keep your key somewhere safe. Your new key: " + saveKey + "\n", {
        status: 200,
        headers: { "Content-Type": "text/plain",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "charset": "utf-8",
        }
      });
    },
    "/status": async () => {
      return Response.json({
        status: "ok",
        message: "Server is running",
        version: "1.0.0",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        server: {
          name: "Bun Server",
          version: process.versions.bun,
        },
        node: {
          version: process.versions.node,
          platform: process.platform,
          arch: process.arch,
        },
        memory: {
          rss: process.memoryUsage().rss,
          heapTotal: process.memoryUsage().heapTotal,
          heapUsed: process.memoryUsage().heapUsed,
          external: process.memoryUsage().external,
        },
        cpu: {
          user: process.cpuUsage().user,
          system: process.cpuUsage().system,
        },
        env: {
          NODE_ENV: process.env.NODE_ENV,
          SERVER_PORT: process.env.SERVER_PORT,
        },
        memoryUsage: {
          rss: process.memoryUsage().rss,
          heapTotal: process.memoryUsage().heapTotal,
          heapUsed: process.memoryUsage().heapUsed,
          external: process.memoryUsage().external,
        },
        cpuUsage: {
          user: process.cpuUsage().user,
          system: process.cpuUsage().system,
        },
        process: {
          pid: process.pid,
          title: process.title,
          version: process.version,
          platform: process.platform,
          arch: process.arch,
          uptime: process.uptime(),
        },
      });
    },
    "/**": new Response(F404, {
      status: 404,
      headers: { "Content-Type": "text/html" },
    }),
}
});
console.log("Server running at :" +  (process.env.SERVER_PORT || 55330) );