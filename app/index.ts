import { file } from "bun";
import runDeployCommand from "./components/runDeployCommand";
import checkToken from "./components/checkToken";

const F404 = await file("./app/assets/404.html").text();

Bun.serve({
  port: Number(process.env.SERVER_PORT),
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
             },
          })
    },
    "/**": new Response(F404, {
      status: 404,
      headers: { "Content-Type": "text/html" },
    }),
}
});
console.log("Server running at :" +  process.env.SERVER_PORT);