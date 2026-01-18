"use client";

import { useState } from "react";

export function DeliveryOptions() {
  
  const [selected, setSelected] = useState<"inside" | "outside" | null>(null);

  return (
    <div className="mb-8">
      <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-600 mb-4">
        Select Delivery Option
      </h2>

      <div className="space-y-3">
        {/* Inside Dhaka */}
        <label
          htmlFor="inside"
          className={`flex flex-col sm:flex-row cursor-pointer gap-4 rounded-2xl border p-4 transition-all
            ${
              selected === "inside"
                ? "shadow-lg"
                : "border-gray-200 hover:border-gray-300"
            }`}
        >
          <input
            id="inside"
            type="radio"
            name="delivery"
            checked={selected === "inside"}
            onChange={() => setSelected("inside")}
            className="mt-1 h-4 w-4 accent-black"
          />

          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold">
                Inside Dhaka · Regular Delivery
              </p>
              <span className="font-bold sm:ml-4">Tk. 60</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Delivery within 48 hours
            </p>
          </div>
        </label>

        {/* Outside Dhaka */}
        <label
          htmlFor="outside"
          className={`flex flex-col sm:flex-row cursor-pointer gap-4 rounded-2xl border p-4 transition-all
            ${
              selected === "outside"
                ? "shadow-lg"
                : "border-gray-200 hover:border-gray-300"
            }`}
        >
          <input
            id="outside"
            type="radio"
            name="delivery"
            checked={selected === "outside"}
            onChange={() => setSelected("outside")}
            className="mt-1 h-4 w-4 accent-black"
          />

          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold">
                Outside Dhaka · Regular Delivery
              </p>
              <span className="font-bold sm:ml-4">Tk. 120</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Delivery within 3–7 days
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
