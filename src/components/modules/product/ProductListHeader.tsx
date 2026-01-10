import ProductSortListHeader from "./ProductSortListHeader";


interface Props {
  total: number;
}

const ProductListHeader = ({ total }: Props) => {
  return <ProductSortListHeader total={total} />;
};

export default ProductListHeader;
