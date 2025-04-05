import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import FastifyJwt, { FastifyJwtNamespace } from "@fastify/jwt";

const jwt: FastifyPluginAsync = async (fastify, _opts) => {
  fastify.register(FastifyJwt, {
    secret: fastify.config.JWT_SECRET,
    namespace: "security",
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

declare module "fastify" {
  interface FastifyInstance extends FastifyJwtNamespace<{ namespace: "security" }> {}
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: string };
    user: {
      id: string;
      email: string;
    };
  }
}
