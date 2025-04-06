import { FastifyPluginCallbackZodOpenApi } from "fastify-zod-openapi";

const routes: FastifyPluginCallbackZodOpenApi = (_fastify, _, done) => {
  done();
};

export default routes;
