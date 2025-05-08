import F404 from "./assets/404.html";

Bun.serve({
  port: Number(process.env.SERVER_PORT),
  development: false,
  routes: {
    "/application/:app/deploy": async (req) => {
        const app = req.params.app;
        return new Response("Deploying " + app, {
            status: 200,
            headers: { "Content-Type": "text/plain" },
          })
    },
    "/**": new Response(F404, {
      status: 404,
      headers: { "Content-Type": "text/html" },
    }),
  },
});
