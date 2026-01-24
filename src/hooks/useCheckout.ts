import { useCart } from "@/context/CartContext";
import { useState } from "react";

type DeliveryOption = "inside_dhaka" | "outside_dhaka";

export const useCheckout = () => {
  const { cart , removeItem} = useCart();

  const [delivery, setDelivery] = useState<string | null>(null); // store id string
  const [payment, setPayment] = useState<"online" | "cod" | null>(null);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    state: "",
    address: "",
  });

  return {
    cart,
    delivery,
    setDelivery,
    payment,
    setPayment,
    address,
    setAddress,
    removeItem,
  };
};
