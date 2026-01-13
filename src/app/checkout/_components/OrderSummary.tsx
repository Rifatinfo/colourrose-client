import React from 'react'
export function OrderSummary() {
  return (
    <div className="mb-6">
      <div className="bg-[#E5E5E5] p-4">
        <h2 className="text-[#333333] font-bold uppercase text-sm mb-4">
          Order Summary
        </h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <span className="text-gray-600">No of Products:</span>
            <span className="font-bold text-[#E31E24]">1</span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <span className="text-gray-600">Payable Amount:</span>
            <span className="font-bold text-gray-800">Tk. 840</span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <span className="text-gray-600">Delivery Charge:</span>
            <span className="font-bold text-gray-800">Tk. 60</span>
          </div>

          <div className="flex justify-between items-center pt-2 bg-white px-2 py-3 -mx-2 mt-2 shadow-sm">
            <span className="font-bold text-gray-800">Grand Total:</span>
            <span className="font-bold text-[#E31E24] text-lg">Tk. 900</span>
          </div>
        </div>
      </div>
    </div>
  )
}
