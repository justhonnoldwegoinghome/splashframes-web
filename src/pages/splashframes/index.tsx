import Head from "next/head";

import { SplashframeCards } from "@/features/splashframes";

export default function Page() {
  return (
    <>
      <Head>
        <title>Splashframes</title>
        <meta property="og:site_name" content="Splashframes" />
        <meta
          property="og:url"
          content="https://shop.splashframes.com/images"
        />
        <meta property="og:title" content="Splashframes" />
        <meta property="og:type" content="product" />
        <meta property="og:description" content="Splashframes" />
        <meta
          property="og:image"
          content="https://api.splashframes.com/static/images/galactic-gaze.jpg"
        />
      </Head>
      <div>
        <SplashframeCards />
      </div>
    </>
  );
}
