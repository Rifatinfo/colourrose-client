"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toast } from "@/components/shared/Toast/Toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/services/order/order.api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

interface CartItem {
  productId: string;
  quantity: number;
  color: string;
  size: string;
}

interface Address {
  name: string;
  phone: string;
  state?: string;
  address: string;
}

interface Checkout {
  cart: CartItem[];
  delivery: string | null;
  payment: "online" | "cod" | null;
  address: Address;
  setPayment: (v: "online" | "cod") => void;
}

export function PaymentOptions({ checkout }: { checkout: Checkout }) {
  const { cart, removeItem } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleProceed = async () => {
    // ======== VALIDATIONS ======== //
    if (!checkout.delivery) {
      Swal.fire({ icon: "warning", title: "Select delivery option" });
      return;
    }

    if (!checkout.address?.name) {
      Swal.fire({ icon: "warning", title: "Fill delivery address" });
      return;
    }
    if (!checkout.address?.phone) {
      Swal.fire({ icon: "warning", title: "Fill delivery phone" });
      return;
    }

    if (!checkout.payment) {
      Swal.fire({ icon: "warning", title: "Select payment method" });
      return;
    }

    if (!checkout.cart || checkout.cart.length === 0) {
      Swal.fire({ icon: "warning", title: "Your cart is empty" });
      return;
    }

    if (!agreed) {
      Swal.fire({
        icon: "warning",
        title: "You must agree to Terms & Conditions",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // ======== MAP PAYLOAD FOR BACKEND ======== //
      const payload = {
        deliveryInfo: {
          name: checkout.address.name,
          phone: checkout.address.phone,
          state: checkout.address.state || "",
          address: checkout.address.address,
        },
        deliveryType:
          checkout.delivery === "inside" ? "inside_dhaka" : "outside_dhaka",
        cartItems: checkout.cart.map((item) => {
          if (!item.productId || !item.quantity) {
            throw new Error("Invalid cart item: " + JSON.stringify(item));
          }
          return {
            productId: item.productId,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
          };
        }),
        paymentMethod: checkout.payment.toUpperCase(),
      };

      // ======== CALL BACKEND API ======== //
      const order = await createOrder(payload);

      // ======== HANDLE SUCCESS ======== //
      if (checkout.payment === "cod") {
        //================ Clear the cart =============//
        cart.forEach((item) =>
          removeItem(item.productId, item.color, item.size),
        );
      Toast.fire({ icon: "success", title: "Order placed successfully" });
        router.push("/order-success");
      } else if (checkout.payment === "online") {
        if (order.data.paymentUrl) {
          window.location.href = order.data.paymentUrl;
        } else {
          Toast.fire({
            icon: "success",
            title: "Order created. Proceed to payment.",
          });
        }
      }
    } catch (err: any) {
      console.error("Checkout Error:", err.message || err);
      Toast.fire({
        icon: "error",
        title: err.message || "Checkout failed",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="mb-8 rounded-none shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xlg text-gray-600 font-semibold uppercase">
          Payment & Shipping
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Terms */}
        <Label className="flex gap-2">
          <Checkbox
            checked={agreed}
            onCheckedChange={(v) => setAgreed(Boolean(v))}
            className="border-2 border-gray-400 mt-1"
          />
          <span>
            I agree to the{" "}
            <span className="text-[#CC0033] font-medium">
              Terms & Conditions
            </span>
          </span>
        </Label>

        {/* Payment */}
        <div>
          <p className="mb-2 font-semibold text-sm">Payment Method</p>
          <RadioGroup
            value={checkout.payment ?? ""}
            onValueChange={(v) => checkout.setPayment(v as "online" | "cod")}
            className="space-y-3"
          >
            <Label className="flex items-center gap-3 border p-4 cursor-pointer">
              <RadioGroupItem value="online" />
              Pay Online
            </Label>

            <Label className="flex items-center gap-3 border p-4 cursor-pointer">
              <RadioGroupItem value="cod" />
              Cash on Delivery
            </Label>
          </RadioGroup>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          className="w-full py-3 text-sm font-bold uppercase cursor-pointer text-white bg-black
            flex items-center justify-center gap-2
            transition-transform duration-150"
        >
          {isProcessing && (
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          {isProcessing ? "Processing..." : "Proceed to Order"}
        </button>
      </CardContent>
    </Card>
  );
}
