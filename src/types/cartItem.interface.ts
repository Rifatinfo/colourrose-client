export interface CartItem {
  productId: string;
  name: string;
  sku: string;
  price: number;
  image: string;

  color: string;
  size: string;

  quantity: number;     // user selected
  stock: number;        // variant quantity
}
