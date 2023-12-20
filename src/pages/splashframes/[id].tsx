import _ from "lodash";
import Head from "next/head";

import {
  Splashframe,
  getSplashframe,
  getSplashframes,
} from "@/features/splashframes";
import { AddToCartForm } from "@/features/cart";

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
        <meta property="og:descriptioin" content={splashframe.description} />
        <meta property="og:image" content={splashframe.image_urls[0]} />
      </Head>
      <div>
        <div className="flex gap-12 flex-wrap">
          <div className="flex-[3] min-w-[300px] flex flex-col gap-4">
            <div>
              <img src={splashframe.image_urls[0]} className="rounded" />
            </div>
            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4">
              {splashframe.image_urls.slice(1).map((u) => (
                <img key={u} src={u} className="rounded" />
              ))}
            </div>
            <div></div>
          </div>
          <div className="flex-[2] min-w-[300px]">
            <AddToCartForm splashframe={splashframe} />
          </div>
        </div>
      </div>
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
