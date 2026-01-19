import ProductPage from "@/components/modules/ProductViewDetails/ProductPage";

interface PageProps {
  params: Promise<{
    category: string;
    subCategory: string;
    slug: string;
  }>;
}

const ProductDetailsPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/slug/${slug}`,
    {
      cache: "no-store",
    }
  );

  // if (!res.ok) {
  //   throw new Error("Product not found");
  // }

  const json = await res.json();
  const product = json.data;
  
  return <ProductPage product={product} />;
};

export default ProductDetailsPage;
