import { Image, ImagePage, getImage, getImages } from "@/features/images";
import { Product, getImageProducts } from "@/features/products";
import { APIList } from "@/types/api";

export default function Page({
  image,
  imageProducts,
}: {
  image: Image;
  imageProducts: APIList<Product>;
}) {
  return <ImagePage image={image} imageProducts={imageProducts} />;
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
