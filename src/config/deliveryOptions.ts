export type DeliveryOption = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export const deliveryOptions : DeliveryOption[] = [
  {
    id: "inside",
    title: "Inside Dhaka · Regular Delivery",
    description: "Delivery within 48 hours",
    price: 60,
  },
  {
    id: "outside",
    title: "Outside Dhaka · Regular Delivery",
    description: "Delivery within 3–7 days",
    price: 120,
  },
];
