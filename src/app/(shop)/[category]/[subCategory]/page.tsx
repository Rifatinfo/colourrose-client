/* eslint-disable @typescript-eslint/no-explicit-any */

import ProductListHeader from "@/components/modules/product/ProductListHeader";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import TablePagination from "@/components/shared/pagination/TablePagination";
import { ProductCard } from "@/components/shared/ProductCard/ProductCard";
import { fetchProductsBySubCategory } from "@/services/product/product";
import { Suspense } from "react";

export interface PageProps {
  params: {
    category: string;
    subCategory: string;
  };
  searchParams: Promise<{
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

const SubCategoryPage = async ({ params, searchParams }: PageProps) => {
  const { category, subCategory } = await params;
  const resolvedSearchParams = await searchParams;

  const response = await fetchProductsBySubCategory(
    category,
    subCategory,
    resolvedSearchParams
  );

  const products = response?.data ?? [];
  const total = response?.meta?.total ?? 0;
  const limit = Number(response?.meta?.limit) || 10;
  const currentPage = Number(response?.meta?.page) || 1;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-6">
      <Breadcrumb />

      <ProductListHeader total={total} />

      {products.length === 0 ? (
        <p>No products found in this sub-category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Suspense fallback={null}>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default SubCategoryPage;