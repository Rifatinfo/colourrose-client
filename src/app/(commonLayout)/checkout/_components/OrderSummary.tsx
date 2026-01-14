import React from "react";

export function OrderSummary() {
  return (
    <div className="mb-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
        {/* Header */}
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-5">
          Order Summary
        </h2>

        {/* Content */}
        <div className="space-y-4 text-sm">
          {/* Products */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">No of Products</span>
            <span className="font-semibold text-gray-900">1</span>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed"></div>

          {/* Payable */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Payable Amount</span>
            <span className="font-semibold text-gray-900">Tk. 840</span>
          </div>

          {/* Delivery */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Delivery Charge</span>
            <span className="font-semibold text-gray-900">Tk. 60</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Grand Total */}
          <div className="flex justify-between items-center rounded-xl bg-gray-50 px-4 py-3">
            <span className="text-base font-semibold text-gray-900">
              Grand Total
            </span>
            <span className="text-lg font-bold text-[#E31E24]">
              Tk. 900
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}