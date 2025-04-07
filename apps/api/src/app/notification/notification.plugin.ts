import { FastifyPluginCallback } from "fastify";
import notificationRoutes from "./notification.routes.js";

const notification: FastifyPluginCallback = (fastify, _opts, done) => {
  // add decorators

  // register routes
  fastify.register(notificationRoutes, {
    prefix: "/notification",
  });

  done();
};

export default notification;
