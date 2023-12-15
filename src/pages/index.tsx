import Head from "next/head";

import { ImageCards } from "@/features/images";

export default function Page() {
  return (
    <>
      <Head>
        <title>Splashframes</title>
      </Head>
      <div>
        <div className="pt-12 pb-36">
          <ImageCards />
        </div>
      </div>
    </>
  );
}
