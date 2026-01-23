"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type PaymentMethod = "online" | "cod";

export function PaymentOptions() {
  const [payment, setPayment] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreed, setAgreed] = useState(false);


  const handleProceed = async () => {
   

    setIsProcessing(true);
    try {
      //  real order / payment logic here
    } catch (err) {
      console.error(err);
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
            value={payment ?? ""}
            onValueChange={(v) => setPayment(v as PaymentMethod)}
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
