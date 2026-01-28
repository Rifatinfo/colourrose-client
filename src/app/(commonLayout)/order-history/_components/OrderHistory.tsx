import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Order } from "./OrderCard";

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <Card>
      {/* Order meta */}
      <CardHeader className="flex flex-col gap-2 border-b text-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-6 text-muted-foreground">
          <span>
            <strong className="text-foreground">Order placed:</strong>{" "}
            {order.placed}
          </span>
          <span>
            <strong className="text-foreground">Total:</strong> TK 
            {order.total.toFixed(2)}
          </span>
          <span>
            <strong className="text-foreground">Order ID:</strong> #{order.id}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="uppercase bg-black text-white">
            {order.status}
          </Badge>
          <Button variant="link" className="px-0 text-sm cursor-pointer">
            View Invoice
          </Button>
        </div>
      </CardHeader>

      {/* Product */}
      <CardContent className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pt-6">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-md border">
            <Image
              src="https://colourrose.shop/wp-content/uploads/2024/03/P-1131-01-768x998.jpg"
              alt={order.product.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="font-medium">{order.product.name}</h3>
            <p className="text-sm text-muted-foreground">
              Color: {order.product.color} &nbsp;·&nbsp; Size:{" "}
              {order.product.size} &nbsp;·&nbsp; Qty: {order.product.qty}
            </p>
            <p className="mt-1 font-semibold">
              {order.product.price.toFixed(2)} TK
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">Review Product</Button>
          <Button>Buy It Again</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderCard;