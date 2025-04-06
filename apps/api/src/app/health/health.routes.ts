import { FastifyPluginCallbackZodOpenApi } from "fastify-zod-openapi";

const routes: FastifyPluginCallbackZodOpenApi = (fastify, _opts, done) => {
  fastify.get("/", {}, async () => {
    await fastify.db.selectFrom("user").selectAll().limit(1).execute();
    return {
      status: "ok",
    };
  });
  done();
};

export default routes;
