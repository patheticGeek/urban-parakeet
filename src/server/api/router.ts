import { isAuthed } from "./middlewares/isAuthed";
import { t } from "./trpc";

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
