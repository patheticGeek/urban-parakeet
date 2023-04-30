import { type AppType } from "next/app";
import Head from "next/head";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Wisdom Circle</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
