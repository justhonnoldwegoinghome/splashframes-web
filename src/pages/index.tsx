import Head from "next/head";

import { SplashframeCards } from "@/features/splashframes";

export default function Page() {
  return (
    <>
      <Head>
        <title>Splashframes</title>
      </Head>
      <div>
        <SplashframeCards />
      </div>
    </>
  );
}
