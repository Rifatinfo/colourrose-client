import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import WishlistTable from "./_components/WishlistTable";

export const items = [
  {
    id: '1',
    title: 'Artificial Leather Jacket',
    price: 2548,
    image: 'https://images.unsplash.com/photo-1520974735194-6c5f7a3b8c33',
    stock: 'in_stock' as const,
  },
  {
    id: '2',
    title: 'Artificial Leather Jacket',
    price: 2548,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
    stock: 'in_stock' as const,
  },
  {
    id: '3',
    title: 'Black Winter Jacket',
    price: 3199,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c1ed11',
    stock: 'out_of_stock' as const,
  },
];
const page = () => {
  return (
    <div>
      <Breadcrumb/>
      <WishlistTable items={items} />
    </div>
  );
};

export default page;
