import { type AppType } from "next/app";
import Head from "next/head";
import { Poppins } from "next/font/google";
import clsx from "clsx";
import { api } from "~/utils/api";
import "~/styles/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Wisdom Circle</title>
      </Head>

      <main className={clsx(poppins.variable, "min-h-screen font-sans")}>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default api.withTRPC(MyApp);
