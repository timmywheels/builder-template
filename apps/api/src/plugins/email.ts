import { FastifyPluginCallback } from "fastify";
import sgMail from "@sendgrid/mail";

const email: FastifyPluginCallback = (fastify, _opts, done) => {
  sgMail.setApiKey(fastify.config.SENDGRID_API_KEY);
  fastify.decorate("email", sgMail);
  done();
};

export default email;

declare module "fastify" {
  interface FastifyInstance {
    email: sgMail.MailService;
  }
}
