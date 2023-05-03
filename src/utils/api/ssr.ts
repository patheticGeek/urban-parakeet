import { createServerSideHelpers } from "@trpc/react-query/server";
import {
  type GetServerSidePropsResult,
  type GetServerSidePropsContext,
} from "next";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import superjson from "superjson";

export const createHelpers = (ctx: GetServerSidePropsContext) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createTRPCContext({ req: ctx.req, res: ctx.res }),
    transformer: superjson,
  });

  return helpers;
};

export const createCaller = (ctx: GetServerSidePropsContext) => {
  return appRouter.createCaller(
    createTRPCContext({ req: ctx.req, res: ctx.res })
  );
};

export const withHydratedState = <Result>(
  helpers: ReturnType<typeof createHelpers>,
  result: Extract<GetServerSidePropsResult<Result>, { props: unknown }>
): Extract<GetServerSidePropsResult<Result>, { props: unknown }> => {
  Object.assign(result, {
    props: {
      ...(result.props || {}),
      trpcState: helpers.dehydrate(),
    },
  });

  return result;
};
