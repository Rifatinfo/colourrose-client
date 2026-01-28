"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderCard from "./OrderHistory";
import EmptyState from "./EmptyState";

type OrderStatus = "completed" | "pending";

export interface Order {
  id: string;
  placed: string;
  total: number;
  status: OrderStatus;
  product: {
    name: string;
    image: string;
    color?: string;
    size?: string;
    qty: number;
    price: number;
  };
}

const orders: Order[] = [
  {
    id: "ORD-8829-XQ",
    placed: "October 24, 2023",
    total: 249,
    status: "completed",
    product: {
      name: "Pro Wireless Noise-Cancelling Headphones",
      image: "/headphone.png",
      color: "Matte Black",
      size: "One Size",
      qty: 1,
      price: 249,
    },
  },
  {
    id: "ORD-774-MN",
    placed: "October 12, 2023",
    total: 75.5,
    status: "completed",
    product: {
      name: "Minimalist Aluminum Laptop Stand",
      image: "/laptop-stand.png",
      color: "Silver",
      size: "Universal",
      qty: 1,
      price: 75.5,
    },
  },
];

  const OrderHistory = () => {
  return (
    <div className=" px-4 lg:px-8 py-10 mt-[64px]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Order History</h1>
        <p className="text-sm text-muted-foreground">
          Manage your purchases and track current shipments.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        {/* ALL ORDERS */}
        <TabsContent value="all" className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        {/* PENDING */}
        <TabsContent value="pending">
          <EmptyState />
        </TabsContent>

        {/* COMPLETED */}
        <TabsContent value="completed" className="space-y-6">
          {orders
            .filter((o) => o.status === "completed")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default OrderHistory;

