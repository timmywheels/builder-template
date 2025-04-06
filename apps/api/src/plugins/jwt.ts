import { FastifyPluginAsync, FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";

const jwt: FastifyPluginAsync = async (fastify, _opts) => {
  await fastify.register(fastifyJwt, {
    secret: fastify.config.JWT_SECRET,
  });

  fastify.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
};

export default jwt;

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: string };
    user: {
      id: string;
      email: string;
    };
  }
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
}
