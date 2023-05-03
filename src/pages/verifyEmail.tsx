import { type GetServerSideProps } from "next";
import { createCaller } from "~/utils/api/ssr";

const VerifyEmailPage = () => {
  return <></>;
};

export default VerifyEmailPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const caller = createCaller(ctx);

  await caller.auth.login({ email: "geekpathetic@gmail.com", password: "asd" });

  return { props: {} };
};
