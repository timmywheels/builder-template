import { FastifyPluginCallbackZodOpenApi } from "fastify-zod-openapi";
import { GoogleUser } from "./auth.schema.js";
import { z } from "zod";
import { UserNotFoundError } from "./auth.errors.js";

const routes: FastifyPluginCallbackZodOpenApi = (fastify, _opts, done) => {
  fastify.get("/google", {}, (req, res) => {
    return fastify.oauth2Google.generateAuthorizationUri(req, res, (err, uri) => {
      if (err) {
        fastify.log.error(err);
        return res.status(500).send("Error generating authorization URI");
      }
      return res.redirect(uri);
    });
  });

  fastify.get("/google/callback", {}, async (req, res) => {
    const { token: providerToken } =
      await fastify.oauth2Google.getAccessTokenFromAuthorizationCodeFlow(req);

    const userInfo = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
      headers: {
        Authorization: `Bearer ${providerToken.access_token}`,
      },
    });

    const userInfoData: GoogleUser = await userInfo.json();
    const existingUser = await fastify.user.repository.user.getUserByEmail(userInfoData.email);

    if (existingUser) {
      const token = fastify.jwt.sign({ id: existingUser.id });
      return res.redirect(`${fastify.config.WEB_BASE_URL}/login?token=${token}`);
    }

    const token = await fastify.auth.services.auth.register({
      email: userInfoData.email,
      name: userInfoData.name ?? null,
      avatar: userInfoData.picture ?? null,
      password: null,
      isSso: true,
    });

    return res.redirect(`${fastify.config.WEB_BASE_URL}/login?token=${token}`);
  });
  done();

  fastify.post(
    "/login",
    {
      schema: {
        body: z.object({
          email: z.string(),
          password: z.string(),
        }),
      },
    },
    async (req, res) => {
      const { email, password } = req.body;
      const token = await fastify.auth.services.auth.login({ email, password });
      return res.status(200).send({ token });
    }
  );

  fastify.post(
    "/register",
    {
      schema: {
        body: z.object({
          email: z.string(),
          password: z.string(),
          name: z.string().optional(),
          avatar: z.string().optional(),
        }),
      },
    },
    async (req, res) => {
      const { email, password, name, avatar } = req.body;
      const hashedPassword = await fastify.auth.services.auth.hashValue(password);
      await fastify.auth.services.auth.register({
        email,
        password: hashedPassword,
        name: name ?? null,
        avatar: avatar ?? null,
        isSso: false,
      });
      return res.redirect(`${fastify.config.WEB_BASE_URL}/signup?pending=true`);
    }
  );

  fastify.get(
    "/me",
    {
      onRequest: [fastify.authenticate],
      schema: {
        response: {
          200: z.object({
            data: z.object({
              id: z.string(),
              email: z.string(),
              name: z.string().nullable(),
              avatar: z.string().nullable(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const user = await fastify.user.repository.user.getUserById(request.user.id);
      if (!user) {
        throw new UserNotFoundError();
      }
      return reply.status(200).send({ data: user });
    }
  );

  fastify.post(
    "/account-confirmation",
    {
      schema: {
        description: "Send account confirmation email",
        body: z.object({
          email: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { email } = request.body;
      const token = await fastify.auth.services.auth.generateToken(email);
      await fastify.auth.services.auth.sendAccountConfirmationEmail(email, token);
      return reply.redirect(`${fastify.config.WEB_BASE_URL}/signup?pending=true`);
    }
  );

  fastify.post(
    "/password-reset",
    {
      schema: {
        description: "Send password reset email",
        body: z.object({
          email: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { email } = request.body;
      const token = await fastify.auth.services.auth.generateToken(email);
      await fastify.user.repository.user.updateUserPasswordResetToken({
        where: { email },
        data: { passwordResetToken: token },
      });
      await fastify.auth.services.auth.sendPasswordResetEmail(email, token);
      return reply.redirect(`${fastify.config.WEB_BASE_URL}/forgot-password?pending=true`);
    }
  );

  fastify.get(
    "/confirm-account",
    {
      schema: {
        description: "Confirm account",
        querystring: z.object({
          token: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { token } = request.query;
      const user = await fastify.user.repository.user.getUserByAccountConfirmationToken({
        accountConfirmationToken: token,
      });
      if (!user) {
        throw new UserNotFoundError();
      }
      await fastify.auth.services.auth.confirmAccount({ token });
      const accessToken = fastify.jwt.sign({ id: user.id });
      return reply.redirect(`${fastify.config.WEB_BASE_URL}/login?token=${accessToken}`);
    }
  );

  fastify.post(
    "/reset-password",
    {
      schema: {
        description: "Reset password",
        body: z.object({
          password: z.string(),
          token: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { password, token } = request.body;
      const user = await fastify.user.repository.user.getUserByPasswordResetToken({
        passwordResetToken: token,
      });
      if (!user) {
        throw new UserNotFoundError();
      }
      const hashedPassword = await fastify.auth.services.auth.hashValue(password);
      await fastify.auth.services.auth.resetPassword({ password: hashedPassword, token });
      const accessToken = fastify.jwt.sign({ id: user.id });
      return reply.redirect(`${fastify.config.WEB_BASE_URL}/login?token=${accessToken}`);
    }
  );
};

export default routes;
