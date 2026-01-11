/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductListHeader from "@/components/modules/product/ProductListHeader";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import { ProductCard } from "@/components/shared/ProductCard/ProductCard";

interface PageProps {
    params: {
        category: string
    }
    searchParams: Promise<{
        sortBy?: string
        sortOrder?: string
    }>
}


const fetchProductsByCategory = async (category: string, searchParams: PageProps["searchParams"]) => {
    const sp = await searchParams
    const query = new URLSearchParams({
        category,
        ...(sp.sortBy && { sortBy: sp.sortBy }),
        ...(sp.sortOrder && { sortOrder: sp.sortOrder }),
    }).toString()

    // const sp = await searchParams;

    // const query = new URLSearchParams();

    // if (category) query.append("category", category);
    // if (sp.sortBy) query.append("sortBy", sp.sortBy);
    // if (sp.sortOrder) query.append("sortOrder", sp.sortOrder);

    const res = await fetch(`http://localhost:5000/api/v1/product?${query}`, {
        cache: "no-store",
    });
    return res.json();

};

const CategoryPage = async ({ params, searchParams }: PageProps) => {
    const { category } = await params;
    console.log("CATEGORY PAGE 👉", category);

    const response = await fetchProductsByCategory(category, searchParams);

    // const products = response.data; // ✅ already sorted & filtered
    // const total = response.meta.total;
    const products = response?.data ?? [];
    const total = response?.meta?.total ?? 0;
    return (
        <div className="space-y-6">
            <div className="bg-gray-200">
                <Breadcrumb />
            </div>

            <ProductListHeader total={total} />

            {products.length === 0 ? (
                <p>No products found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
                    {products.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};


export default CategoryPage;