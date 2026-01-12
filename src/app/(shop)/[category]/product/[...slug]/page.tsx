import ProductPage from "@/components/modules/ProductViewDetails/ProductPage";

interface ProductDetailsPageProps {
    params: Promise<{
        category: string;
        slug: string[]; // catch-all
    }>;
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
    const { slug } = await params;
    let productSlug: string;

    if (slug.length === 1) {
        // /women/product/jacket-1
        productSlug = slug[0];
    } else {
        // /women/product/winter/jacket-1
        productSlug = slug[1];
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/slug/${productSlug}`,
        { cache: "no-store" }
    );

    const json = await res.json();
    const product = json.data;
    console.log(product);
    
    return (
        <ProductPage
            product={product}
        />
    );

}

export default ProductDetailsPage;
