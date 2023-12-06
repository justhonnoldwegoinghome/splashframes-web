import { Image, ImagePage, getImage, getImages } from "@/features/images";

export default function Page({ image }: { image: Image }) {
  return <ImagePage image={image} />;
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
  const image = await getImage({ id });
  return {
    props: {
      image,
    },
  };
}
