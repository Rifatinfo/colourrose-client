/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


 const  DeliveryAddressForm = ({ address, setAddress }: { address: any ; setAddress: any }) => {
  console.log("Address : ", address);
  
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
            <Input placeholder="Full name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
          </div>

          <div className="space-y-1.5">
            <Label className=" text-gray-600">
              Mobile <span className="text-destructive">*</span>
            </Label>
            <Input placeholder="01XXXXXXXXX" type="number" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
          </div>
        </div>

        {/* State */}
        <div className="space-y-1.5">
          <Label className=" text-gray-600">State</Label>
          <Input type="text" placeholder="you state" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
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
            value={address.address} onChange={(e) => setAddress({ ...address, address: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default DeliveryAddressForm;