import { TRPCError } from "@trpc/server";
import { t } from "../trpc";
import cookie from "cookie";

export const isAuthed = t.middleware(async (opts) => {
  const {
    ctx: { prisma, jwt, req },
  } = opts;

  const cookies = cookie.parse(req.headers["cookie"] || "");

  const payload = cookies.token ? jwt.decrypt(cookies.token) : undefined;

  if (!payload) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.user_id },
    select: { name: true, verified: true, email: true, id: true },
  });

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({ ctx: { user } });
});
