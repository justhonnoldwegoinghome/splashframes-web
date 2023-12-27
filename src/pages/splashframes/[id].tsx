import _ from "lodash";
import Head from "next/head";

import {
  Splashframe,
  SplashframePage,
  getSplashframe,
  getSplashframes,
} from "@/features/splashframes";

export default function Page({ splashframe }: { splashframe: Splashframe }) {
  return (
    <>
      <Head>
        <title>{`${splashframe.title} - Splashframes`}</title>
        <meta name="description" content={splashframe.description} />

        <meta property="og:site_name" content="Splashframes" />
        <meta
          property="og:url"
          content={`https://shop.splashframes.com/splashframes/${splashframe.id}`}
        />
        <meta property="og:title" content={splashframe.title} />
        <meta property="og:type" content="product" />
        <meta property="og:description" content={splashframe.description} />
        <meta property="og:image" content={splashframe.image_urls[0]} />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
      </Head>
      <SplashframePage splashframe={splashframe} />
    </>
  );
}

export async function getStaticPaths() {
  const splashframes = await getSplashframes({ max_page_size: 5000 });
  const paths = splashframes.results.map((s) => ({
    params: {
      id: s.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { id } = context.params!;
  const splashframe = await getSplashframe({ id });

  return {
    props: {
      splashframe,
    },
  };
}
