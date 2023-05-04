import { TRPCError } from "@trpc/server";
import type {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";
import { createCaller } from "~/utils/api/ssr";
import { verifyEmailSchema } from "~/utils/validators/auth";

const VerifyEmailPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return <p className="m-auto">{props.error}</p>;
};

export default VerifyEmailPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const caller = createCaller(ctx);

  const parsed = verifyEmailSchema.safeParse(ctx.query);
  if (!parsed.success) {
    return { props: { error: "invalid_input" } };
  }

  try {
    await caller.auth.verifyEmail(parsed.data);

    return { redirect: { destination: "/", permanent: false } };
  } catch (err) {
    if (err instanceof TRPCError) {
      return { props: { error: err.message } };
    }
    return { props: { error: "invalid_input" } };
  }
};
