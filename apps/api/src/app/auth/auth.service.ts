import { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import {
  InvalidCredentialsError,
  UnknownUserCreationError,
  UserAlreadyExistsError,
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
  }) {
    const existingUser = await this.fastify.user.repository.user.getUserByEmail(params.email);
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.fastify.user.repository.user.createUser({
      email: params.email,
      name: params.name,
      password: params.password,
      avatar: params.avatar,
    });

    if (!user) {
      throw new UnknownUserCreationError();
    }

    return this.generateToken(user.id);
  }

  async generateToken(userId: string): Promise<string> {
    return this.fastify.jwt.sign({ id: userId }, { expiresIn: "30d" });
  }

  private validatePassword(rawPassword: string, hashedPassword: string) {
    return bcrypt.compare(rawPassword, hashedPassword);
  }

  async hashValue(value: string) {
    return bcrypt.hash(value, 10);
  }
}
