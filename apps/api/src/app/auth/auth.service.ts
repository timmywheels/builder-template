import { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import {
  InvalidCredentialsError,
  UnknownUserCreationError,
  UserAlreadyExistsError,
  UserNotConfirmedError,
  UserNotFoundError,
  UserRegisteredWithSocialLoginError,
} from "./auth.errors.js";

export class AuthService {
  constructor(private readonly fastify: FastifyInstance) {}

  async login(params: { email: string; password: string }): Promise<string> {
    const user = await this.fastify.user.repository.user.getUserByEmail(params.email);
    if (!user) {
      throw new UserNotFoundError();
    }

    if (!user.password) {
      // user with email exists but not with password
      // which indicates that the user registered with social login
      throw new UserRegisteredWithSocialLoginError();
    }

    if (!user.isAccountConfirmed) {
      throw new UserNotConfirmedError();
    }

    const isPasswordValid = await this.validatePassword(params.password, user.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    return this.generateToken(user.id);
  }

  async register(params: {
    email: string;
    name?: string | null;
    password?: string | null;
    avatar?: string | null;
    isSso?: boolean;
  }) {
    const existingUser = await this.fastify.user.repository.user.getUserByEmail(params.email);

    if (existingUser && !existingUser.isAccountConfirmed) {
      throw new UserNotConfirmedError();
    }

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.fastify.user.repository.user.createUser({
      email: params.email,
      name: params.name,
      password: params.password,
      avatar: params.avatar,
      isAccountConfirmed: params.isSso ?? false,
      accountConfirmationToken: params.isSso
        ? null
        : await this.generateToken(`${params.email}-account-confirmation`),
    });

    if (!user) {
      throw new UnknownUserCreationError();
    }

    if (!params.isSso) {
      // send account confirmation email if user is not registered with SSO
      await this.sendAccountConfirmationEmail(user.email, user.accountConfirmationToken!);
      return;
    }

    return this.generateToken(user.id);
  }

  async confirmAccount(params: { token: string }) {
    const user = await this.fastify.user.repository.user.getUserByAccountConfirmationToken({
      accountConfirmationToken: params.token,
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    await this.fastify.user.repository.user.updateUser(user.id, {
      accountConfirmationToken: null,
    });
  }

  async resetPassword(params: { password: string; token: string }) {
    const user = await this.fastify.user.repository.user.getUserByPasswordResetToken({
      passwordResetToken: params.token,
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    await this.fastify.user.repository.user.updateUser(user.id, {
      password: params.password,
      passwordResetToken: null,
    });
  }

  async generateToken(userId: string, expiresIn: string = "30d"): Promise<string> {
    return this.fastify.jwt.sign({ id: userId }, { expiresIn });
  }

  private validatePassword(rawPassword: string, hashedPassword: string) {
    return bcrypt.compare(rawPassword, hashedPassword);
  }

  async hashValue(value: string) {
    return bcrypt.hash(value, 10);
  }

  async sendWelcomeEmail(email: string) {
    await this.fastify.email.send({
      to: email,
      from: this.fastify.config.SENDGRID_FROM_EMAIL,
      subject: "Welcome to Builder Template",
      text: "Welcome to Builder Template",
      html: "<strong>Welcome to Builder Template</strong>",
    });
  }

  async sendPasswordResetEmail(email: string, token: string) {
    await this.fastify.email.send({
      to: email,
      from: this.fastify.config.SENDGRID_FROM_EMAIL,
      subject: "Reset Password",
      text: "Reset Password",
      html: `<strong>
      Reset Password
      </strong>
      <p>
      Please click the link below to reset your password:
      </p>
      <a href="${this.fastify.config.WEB_BASE_URL}/api/auth/reset-password?token=${token}">
      Reset Password
      </a>
      `,
    });
  }

  async sendAccountConfirmationEmail(email: string, token: string) {
    await this.fastify.email.send({
      to: email,
      from: this.fastify.config.SENDGRID_FROM_EMAIL,
      subject: "Account Confirmation",
      text: `Account Confirmation`,
      html: `<strong>
      Account Confirmation
      </strong>
      <p>
      Please click the link below to confirm your account:
      </p>
      <a href="${this.fastify.config.WEB_BASE_URL}/api/auth/confirm-account?token=${token}">
      Confirm Account
      </a>
      `,
    });
  }
}
