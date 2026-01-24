"use client";
import { useState } from "react";
import DeliveryAddressForm from "./DeliveryAddressForm";
import { DeliveryOptions } from "./DeliveryOptions";
import { OrderSummary } from "./OrderSummary";
import { PaymentOptions } from "./PaymentOptions";
import { ShoppingCart } from "./ShoppingCart";
import { useCheckout } from "@/hooks/useCheckout";

const CheckoutContent = () => {
// const [delivery, setDelivery] = useState<string | null>(null); // store id
  const checkout = useCheckout();
  
  return (
    <div>
      <main className="px-4 py-6">
        <h1 className="text-xl font-bold uppercase text-[#333333] mb-6 border-b border-gray-200 pb-2">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (Cart, Delivery, Summary) */}
          <div className="lg:col-span-7 xl:col-span-6">
            <ShoppingCart />
            <DeliveryOptions selected={checkout.delivery} onChange={checkout.setDelivery} />
            <OrderSummary selectedDelivery={checkout.delivery} />
          </div>

          {/* Right Column (Address, Payment) */}
          <div className="lg:col-span-5 xl:col-span-6">
            <DeliveryAddressForm  address={checkout.address}
            setAddress={checkout.setAddress} />
            <PaymentOptions checkout={checkout} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutContent;
