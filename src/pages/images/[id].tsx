import Head from "next/head";

import { APIList } from "@/types/api";
import { Image, getImage, getImages } from "@/features/images";
import { ImageProducts, Product, getImageProducts } from "@/features/products";

export default function Page({
  image,
  imageProducts,
}: {
  image: Image;
  imageProducts: APIList<Product>;
}) {
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

export async function getStaticPaths() {
  const images = await getImages({ max_page_size: 5000 });
  const paths = images.results.map((img) => ({
    params: {
      id: img.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { id } = context.params!;
  const [image, imageProducts] = await Promise.all([
    getImage({ id }),
    getImageProducts({ id }),
  ]);

  return {
    props: {
      image,
      imageProducts,
    },
  };
}
