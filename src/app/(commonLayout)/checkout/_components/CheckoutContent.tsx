"use client";
import { useState } from "react";
import { DeliveryAddressForm } from "./DeliveryAddressForm";
import { DeliveryOptions } from "./DeliveryOptions";
import { OrderSummary } from "./OrderSummary";
import { PaymentOptions } from "./PaymentOptions";
import { ShoppingCart } from "./ShoppingCart";

const CheckoutContent = () => {
  const [delivery, setDelivery] = useState("inside_dhaka");

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
            <DeliveryOptions selected={delivery} onChange={setDelivery} />
            <OrderSummary selectedDelivery={delivery} />
          </div>

          {/* Right Column (Address, Payment) */}
          <div className="lg:col-span-5 xl:col-span-6">
            <DeliveryAddressForm />
            <PaymentOptions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutContent;
