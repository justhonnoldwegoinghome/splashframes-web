import Head from "next/head";

import { APIList } from "@/types/api";
import { ImageProducts, Product } from "@/features/products";

import { Image } from "..";

interface ImagePageProps {
  image: Image;
  imageProducts: APIList<Product>;
}

export function ImagePage({ image, imageProducts }: ImagePageProps) {
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
          <ImageProducts imageProducts={imageProducts} />
        </div>
      </div>
    </>
  );
}
