"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


export function DeliveryAddressForm() {
  return (
    <Card className="mb-8 rounded-none shadow-2xl">
      <CardHeader>
        <CardTitle className="text-lg text-gray-600 font-semibold uppercase ">
          Delivery Address
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Name & Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className=" text-gray-600">
              Name <span className="text-destructive ">*</span>
            </Label>
            <Input placeholder="Full name" />
          </div>

          <div className="space-y-1.5">
            <Label className=" text-gray-600">
              Mobile <span className="text-destructive">*</span>
            </Label>
            <Input placeholder="01XXXXXXXXX" />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label className=" text-gray-600">Email</Label>
          <Input type="email" placeholder="you@email.com" />
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <Label className=" text-gray-600">
            Delivery Address <span className="text-destructive">*</span>
          </Label>
          <Textarea
            rows={4}
            placeholder="House, road, area, city"
            className="resize-none w-full md:h-[150px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}

