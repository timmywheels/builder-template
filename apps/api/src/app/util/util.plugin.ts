import { FastifyPluginCallback } from "fastify";
import utilRoutes from "./util.routes.js";

const util: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.register(utilRoutes, {
    prefix: "/util",
  });

  done();
};

export default util;
