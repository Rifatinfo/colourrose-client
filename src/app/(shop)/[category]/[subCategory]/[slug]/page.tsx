import ProductPage from "@/components/modules/ProductViewDetails/ProductPage";
import { products } from "@/lib/products";

const page = ({ params }: { params: { category: string, subCategory: string, slug: string } }) => {
    const product = products.find(
        (p) =>
            p.slug === params.slug &&
            p.category === params.category &&
            p.subCategory === params.subCategory
    );

    if (!product) return;

    return (
        <div>
            <div className="hidden" >
                <h1>{product.name}</h1>
                <p>Price: ৳{product.price}</p>
            </div>
            <div>
                <ProductPage/>
            </div>
        </div>
    );
}
export default page;