"use client";

import { useState } from "react";

export function DeliveryOptions() {
  const [selected, setSelected] = useState<"inside" | "outside">("inside");

  return (
    <div className="mb-8">
      {/* Title */}
      <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-600 mb-4">
        Select Delivery Option
      </h2>

      <div className="space-y-3">
        {/* Inside Dhaka */}
        <label
          htmlFor="inside"
          className={`flex flex-col sm:flex-row cursor-pointer items-start sm:items-center gap-3 sm:gap-4 rounded-2xl border p-4 transition-all duration-300
            ${
              selected === "inside"
                ? "border-2 border-red-400 bg-[#E31E24]/5 shadow-lg"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
            }`}
        >
          <input
            id="inside"
            type="radio"
            name="delivery"
            value="inside"
            checked={selected === "inside"}
            onChange={() => setSelected("inside")}
            className="mt-1 h-4 w-4 text-black accent-black focus:ring-black"
          />

          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
              <p className="text-sm sm:text-base font-semibold text-gray-900">
                Inside Dhaka · Regular Delivery
              </p>
              <span className="text-sm sm:text-base font-bold text-[#E31E24] mt-1 sm:mt-0">
                Tk. 60
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Delivery within 48 hours
            </p>
          </div>
        </label>

        {/* Outside Dhaka */}
        <label
          htmlFor="outside"
          className={`flex flex-col sm:flex-row cursor-pointer items-start sm:items-center gap-3 sm:gap-4 rounded-2xl border p-4 transition-all duration-300
            ${
              selected === "outside"
                ? "border-2 border-red-400 bg-[#E31E24]/5 shadow-lg"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
            }`}
        >
          <input
            id="outside"
            type="radio"
            name="delivery"
            value="outside"
            checked={selected === "outside"}
            onChange={() => setSelected("outside")}
            className="mt-1 h-4 w-4 text-black accent-black focus:ring-black"
          />

          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
              <p className="text-sm sm:text-base font-semibold text-gray-900">
                Outside Dhaka · Regular Delivery
              </p>
              <span className="text-sm sm:text-base font-bold text-[#E31E24] mt-1 sm:mt-0">
                Tk. 120
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Delivery within 3–7 days
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}