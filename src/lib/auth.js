import "server-only";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { jwt } from "better-auth/plugins";
import { getDatabase } from "./db";
import { passwordError } from "./validation";

let instance;

export function getAuth() {
  if (instance) return instance;

  const baseURL = (
    process.env.BETTER_AUTH_URL || "http://localhost:3000"
  ).replace(/\/$/, "");

  const secret = process.env.BETTER_AUTH_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "Set BETTER_AUTH_SECRET to a random value of at least 32 characters.",
    );
  }

  const { db, client } = getDatabase();

  instance = betterAuth({
    appName: "BookNook",
    baseURL,
    secret,
    trustedOrigins: [baseURL],

    database: mongodbAdapter(db, { client }),

    emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
      maxPasswordLength: 128,
      requireEmailVerification: false,
      autoSignIn: false,
    },

    emailVerification: {
      sendOnSignUp: false,
    },

    socialProviders:
      process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
        ? {
            google: {
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            },
          }
        : {},

    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        if (ctx.path === "/sign-up/email") {
          const error = passwordError(
            typeof ctx.body?.password === "string"
              ? ctx.body.password
              : "",
          );

          if (error) {
            throw new APIError("BAD_REQUEST", {
              message: error,
            });
          }
        }
      }),
    },

    plugins: [
      jwt({
        jwt: {
          issuer: baseURL,
          audience: "booknook-api",
          expirationTime: "5m",
          definePayload: ({ user }) => ({
            email: user.email,
            name: user.name,
          }),
        },
        jwks: {
          keyPairConfig: {
            alg: "EdDSA",
            crv: "Ed25519",
          },
        },
      }),
    ],
  });

  return instance;
}