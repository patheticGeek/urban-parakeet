import { type AppType } from "next/app";
import { Poppins } from "next/font/google";
import clsx from "clsx";
import { api } from "~/utils/api/client";
import "~/styles/globals.css";
import { DefaultSeo } from "next-seo";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo
        title="Wisdom Circle"
        titleTemplate="%s - Wisdom Circle"
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://wisdomcircle.com/",
          siteName: "Wisdom Circle",
        }}
      />

      <main
        className={clsx(
          poppins.variable,
          "flex min-h-screen flex-col font-sans"
        )}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default api.withTRPC(MyApp);
