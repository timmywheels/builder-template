import createError from "@fastify/error";

export const InvalidCredentialsError = createError(
  "INVALID_CREDENTIALS",
  "Invalid credentials",
  400
);

export const UserRegisteredWithSocialLoginError = createError(
  "USER_REGISTERED_WITH_SOCIAL_LOGIN",
  "User registered with social login",
  400
);

export const UserAlreadyExistsError = createError(
  "USER_ALREADY_EXISTS",
  "User already exists",
  400
);

export const UserNotFoundError = createError("USER_NOT_FOUND", "User not found", 404);

export const UnknownUserCreationError = createError(
  "UNKNOWN_USER_CREATION_ERROR",
  "Unknown user creation error",
  500
);
