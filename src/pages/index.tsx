import Head from "next/head";

import { SplashframeCards } from "@/features/splashframes";

export default function Page() {
  return (
    <>
      <Head>
        <title>Splashframes</title>
      </Head>
      <div>
        <div className="pt-12 pb-36">
          <SplashframeCards />
        </div>
      </div>
    </>
  );
}
