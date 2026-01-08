import ProductPage from "@/components/modules/ProductViewDetails/ProductPage";
// import { products } from "@/lib/products";

const CategoryPage = () => {
    // { params }: { params: { category: string } }
    // const categoryProducts = products.filter(
    //     (p) => p.category === params.category
    // );
    return (
        <div>
            {/* <h1 className="hidden">{params.category} category</h1> */}

            {/* {categoryProducts.map((p) => (
                <p key={p.id}>{p.name}</p>
            ))} */}
            <ProductPage/>
        </div>
    );
};

export default CategoryPage;