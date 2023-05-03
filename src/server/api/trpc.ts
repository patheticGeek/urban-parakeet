import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { prisma } from "../db";
import { mail } from "../mail";

type CreateCtxOptions =
  | { req: NextApiRequest; res: NextApiResponse }
  | Pick<GetServerSidePropsContext, "req" | "res">;

export const createTRPCContext = (opts: CreateCtxOptions) => {
  return { prisma, mail, ...opts };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
