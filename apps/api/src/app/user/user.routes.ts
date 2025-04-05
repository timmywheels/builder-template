import { FastifyPluginCallbackZodOpenApi } from "fastify-zod-openapi";
import { z } from "zod";

const routes: FastifyPluginCallbackZodOpenApi = (fastify, _, done) => {
  fastify.get(
    "/me",
    {
      schema: {
        response: {
          200: z.any(),
        },
      },
    },
    (request, reply) => {
      return reply.status(200).send({ user: request.user });
    }
  );

  done();
};

export default routes;
