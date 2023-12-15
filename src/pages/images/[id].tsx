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
        <title>{`${image.name} - Splashframes`}</title>
        <meta name="description" content={image.description} />
      </Head>
      <div className="flex gap-4 flex-wrap">
        <div className="flex-[3] min-w-[400px] flex flex-col gap-4">
          <div>
            <img src={image.urls[0]} className="rounded" />
          </div>
          <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4">
            {image.urls.slice(1).map((u) => (
              <img key={u} src={u} className="rounded" />
            ))}
          </div>
          <div></div>
        </div>
        <div className="flex-[2] min-w-[300px] bg-slate-100">
          <h1>{image.name}</h1>
          <p>Price</p>
          <p>Quantity</p>
          <p>Add to cart</p>
        </div>
      </div>
      {/* <div>
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
      </div> */}
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
