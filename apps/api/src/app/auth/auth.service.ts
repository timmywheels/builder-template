import { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
export class AuthService {
  constructor(private readonly fastify: FastifyInstance) {}

  async login(params: { email: string; password: string }): Promise<string> {
    const user = await this.fastify.user.repository.user.getUserByEmail(params.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    if (!user.password) {
      throw new Error("User registered with social login");
    }

    const isPasswordValid = await this.validatePassword(params.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    return this.generateToken(user.id);
  }

  async register(params: {
    email: string;
    name?: string | null;
    password?: string | null;
    avatar?: string | null;
  }) {
    const user = await this.fastify.user.repository.user.createUser({
      email: params.email,
      name: params.name,
      password: params.password,
      avatar: params.avatar,
    });

    if (!user) {
      throw new Error("Failed to create user");
    }

    return this.generateToken(user.id);
  }

  async generateToken(userId: string): Promise<string> {
    return this.fastify.jwt.sign({ id: userId }, { expiresIn: "30d" });
  }

  private validatePassword(rawPassword: string, hashedPassword: string) {
    return bcrypt.compare(rawPassword, hashedPassword);
  }
}
