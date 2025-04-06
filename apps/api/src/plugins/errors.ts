import { FastifyPluginCallback } from "fastify";

const errors: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.setErrorHandler((error, _request, reply) => {
    reply.status((error.statusCode as number) ?? 500).send({
      code: error.code ?? "INTERNAL_SERVER_ERROR",
      error: error.message ?? "Internal server error",
      statusCode: error.statusCode ?? 500,
    });
  });
  done();
};

export default errors;
