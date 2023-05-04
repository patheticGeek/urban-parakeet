import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/router";
import {
  signInSchema,
  signUpSchema,
  verifyEmailSchema,
} from "~/utils/validators/auth";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

const userSelect = { name: true, verified: true, email: true, id: true };

export const authRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx: { user } }) => {
    return user;
  }),

  verifyEmail: publicProcedure
    .input(verifyEmailSchema)
    .mutation(async ({ input, ctx: { prisma, res, jwt } }) => {
      let user = await prisma.user.findUnique({
        where: { email: input.email },
        select: { ...userSelect, password: true, verification: true },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "user_not_found",
        });
      } else if (user.verified) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "user_already_verified",
        });
      }

      if (input.code === user.verification.code) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { verified: true },
          select: { ...userSelect, password: true, verification: true },
        });
      }

      const { tokenCookie } = jwt.encrypt({ user_id: user.id });
      res.setHeader("Set-Cookie", tokenCookie);

      return { ...user, password: undefined, verification: undefined };
    }),

  signIn: publicProcedure
    .input(signInSchema)
    .mutation(async ({ input, ctx: { prisma, res, jwt, mail } }) => {
      const user = await prisma.user.findUnique({
        where: { email: input.email },
        select: { ...userSelect, password: true, verification: true },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "email_invalid",
        });
      }

      const isPasswordValid = await bcrypt.compare(
        input.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "password_invalid",
        });
      }

      if (!user.verified) {
        const oneDay = 1000 * 60 * 60 * 24;
        const now = new Date().getTime();

        if (user.verification.emailSentAt.getTime() + oneDay > now) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              verification: {
                update: {
                  emailSentAt: new Date(),
                },
              },
            },
          });

          await mail.send(
            [user.email],
            mail.templates.verification({
              email: user.email,
              name: user.name,
              code: user.verification.code,
            })
          );
        }

        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "email_verification_required",
        });
      }

      const { tokenCookie } = jwt.encrypt({ user_id: user.id });
      res.setHeader("Set-Cookie", tokenCookie);

      return { ...user, password: undefined, verification: undefined };
    }),

  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx: { prisma, mail, jwt, res } }) => {
      try {
        const password = await bcrypt.hash(input.password, 10);

        const verificationCode = nanoid();
        const user = await prisma.user.create({
          data: {
            ...input,
            password,
            verification: {
              create: {
                code: verificationCode,
                emailSentAt: new Date(),
              },
            },
          },
          select: userSelect,
        });

        await mail.send(
          [user.email],
          mail.templates.verification({
            email: user.email,
            name: user.name,
            code: verificationCode,
          })
        );

        const { tokenCookie } = jwt.encrypt({ user_id: user.id });
        res.setHeader("Set-Cookie", tokenCookie);

        return { ...user, password: undefined, verification: undefined };
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "email_invalid",
        });
      }
    }),
});
