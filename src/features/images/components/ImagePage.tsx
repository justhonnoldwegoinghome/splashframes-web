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
        <h1>{image.name}</h1>
        <p>{image.description}</p>
        <div className="grid grid-cols-2 tablet:grid-cols-3 gap-2">
          {image.urls.map((u) => (
            <img key={u} src={u} className="object-cover" />
          ))}
        </div>
        <div>
          <AddToCartButton cartItem={{ id: image.id, quantity: 1 }} />
        </div>
      </div>
    </>
  );
}
