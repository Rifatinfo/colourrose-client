"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import Image from "next/image";

export function PaymentOptions() {
  const [method, setMethod] = useState<"online" | "cod">("online");

  return (
    <Card className="mb-8 rounded-none shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xlg text-gray-600 font-semibold uppercase">
          Payment Method
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Terms */}
        <div className="flex flex-wrap sm:flex-row sm:items-center gap-2 sm:gap-3 ">

          <Label htmlFor="terms" className="leading-relaxed flex flex-wrap  gap-x-1 ">
            <Checkbox id="terms" className="border-2 border-gray-400 mt-1 shrink-0" />
            I agree to the{" "}
            <span className="font-medium text-[#CC0033]">Terms & Conditions</span> {" "}
            <span className="font-medium text-[#CC0033]">Refund & Return Policy</span>and{" "}
            <span className="font-medium text-[#CC0033]">Privacy Policy</span> {" "}
          </Label>
        </div>

        {/* Payment Methods */}
        <RadioGroup
          value={method}
          onValueChange={(v) => setMethod(v as "online" | "cod")}
          className="space-y-3"
        >
          {/* Online */}
          <Label
            htmlFor="online"
            className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition
              ${method === "online"
                ? "border-2 border-red-400 bg-white/5"
                : "border-border  hover:bg-muted"
              }`}
          >
            <div className="flex flex-col items-start gap-3">
              {/* Radio button with label */}
              <div className="flex items-center gap-2">
                <RadioGroupItem value="online" id="online" />
                <label htmlFor="online" className="text-sm font-medium">
                  Pay Online
                </label>
              </div>

              {/* Payment image */}
              <div className="flex items-center gap-2">
                <Image
                  src="https://res.cloudinary.com/dgp5rqeqh/image/upload/v1768378984/payment_tzrzin.png"
                  alt="Visa"
                  width={800} // smaller, responsive width
                  height={60}
                  className="object-contain max-w-full"
                />
              </div>
            </div>

          </Label>

          {/* COD */}
          <Label
            htmlFor="cod"
            className={`flex flex-col md:flex-row items-start md:items-center justify-between rounded-xl border p-4 cursor-pointer transition
    ${method === "cod"
                ? "border-2 border-red-400 bg-white/5"
                : "border-border hover:bg-muted"
              }`}
          >
            {/* Radio + Title */}
            <div className="flex items-center gap-3">
              <RadioGroupItem value="cod" id="cod" />
              <span className="font-medium">Cash on Delivery</span>
            </div>

            {/* Subtitle */}
            <span className="text-xs text-muted-foreground mt-1 md:mt-0">
              Pay after delivery
            </span>
          </Label>

        </RadioGroup>
      </CardContent>
    </Card>
  );
}
