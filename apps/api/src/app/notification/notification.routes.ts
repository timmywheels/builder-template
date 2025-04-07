import { FastifyPluginCallbackZodOpenApi } from "fastify-zod-openapi";
import { z } from "zod";
import sgMail from "@sendgrid/mail";
const routes: FastifyPluginCallbackZodOpenApi = (fastify, _opts, done) => {
  fastify.post(
    "/",
    {
      schema: {
        body: z.object({
          to: z.string().email(),
          from: z.string().email(),
          subject: z.string(),
          text: z.string(),
          html: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { to, from, subject, text, html } = request.body;
      const msg: sgMail.MailDataRequired = {
        to,
        from,
        subject,
        text,
        html,
      };
      await fastify.email.send(msg);
      return reply.status(200).send({ message: "Email sent" });
    }
  );
  done();
};

export default routes;
