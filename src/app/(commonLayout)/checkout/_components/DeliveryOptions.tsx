"use client";

import {  deliveryOptions } from "@/config/deliveryOptions";
import { useSyncExternalStore } from "react";

type Props = {
  selected: string | null; // selected option id
  onChange: (val: string) => void; // pass id string
};

export function DeliveryOptions({ selected, onChange }: Props) {
  console.log(selected);
  console.log("deliveryOptions : ", deliveryOptions);
  
  //================Prevent SSR hydration mismatch for client-only state (cart/localStorage) ================//
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) return null;
  return (
    <div className="mb-8">
      <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-600 mb-4">
        Select Delivery Option
      </h2>

      <div className="space-y-3">
        {deliveryOptions.map((option) => (
          <label
            key={option.id}
            htmlFor={option.id}
            className={`flex flex-col sm:flex-row cursor-pointer gap-4 rounded-2xl border p-4 transition-all
      ${selected === option.id ? "shadow-lg" : "border-gray-200 hover:border-gray-300"}`}
          >
            <input
              id={option.id}
              type="radio"
              name="delivery"
              checked={selected === option.id} // compare string to string
              onChange={() => onChange(option.id)} // pass string id
              className="mt-1 h-4 w-4 accent-black"
            />

            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="font-semibold">{option.title}</p>
                <span className="font-bold sm:ml-4">Tk. {option.price}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{option.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
