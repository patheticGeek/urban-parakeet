import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    PORT: z.number().default(3000),
    NODE_ENV: z.enum(["development", "test", "production"]),
    VERCEL_URL: z.string().optional(),
    DATABASE_URL: z.string().url(),
    SIB_API_KEY: z.string().min(1),
  },

  client: {},

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    PORT: process.env.PORT,
    SIB_API_KEY: process.env.SIB_API_KEY,
  },
});
