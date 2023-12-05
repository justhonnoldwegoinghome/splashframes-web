import Head from "next/head";

import { AddToCartButton } from "@/features/cart";

import { Image } from "..";

interface ImagePageProps {
  image: Image;
}

export function ImagePage({ image }: ImagePageProps) {
  return (
    <>
      <Head>
        <title>{image.id}</title>
      </Head>
      <div>
        <h1>{image.title}</h1>
        <p>{image.description}</p>
        <img src={image.url} />
        <div>
          <AddToCartButton id={image.id} />
        </div>
      </div>
    </>
  );
}
