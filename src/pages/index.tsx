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
        <meta
          property="og:description"
          content="Redefine your surroundings with captivating images that seamlessly blend creativity and technology. Explore now and bring the enchantment of AI art to your walls!"
        />
        <meta property="og:image" content="/logo.png" />
      </Head>
      <div>
        <SplashframeCards />
      </div>
    </>
  );
}
