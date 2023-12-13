import Head from "next/head";

import { ImageCards } from "@/features/images";

export default function Page() {
  return (
    <>
      <Head>
        <title>Images</title>
      </Head>
      <div>
        <ImageCards />
      </div>
    </>
  );
}
