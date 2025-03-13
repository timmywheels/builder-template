import { FastifyPluginCallbackZodOpenApi } from "fastify-zod-openapi";

const routes: FastifyPluginCallbackZodOpenApi = (fastify, _opts, done) => {
  fastify.get("/health", {}, () => {
    return {
      status: "ok",
    };
  });
  done();
};

export default routes;
