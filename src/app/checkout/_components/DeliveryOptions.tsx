"use client"
import  { useState } from 'react'
export function DeliveryOptions() {
  const [selected, setSelected] = useState('inside')
  return (
    <div className="mb-6">
      <h2 className="text-[#333333] font-bold uppercase text-sm mb-3">
        Select Delivery Option
      </h2>
      <div className="bg-white border border-gray-200">
        {/* Option 1 */}
        <label className="flex items-start p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
          <div className="flex items-center h-5">
            <input
              type="radio"
              name="delivery"
              value="inside"
              checked={selected === 'inside'}
              onChange={() => setSelected('inside')}
              className="w-4 h-4 text-[#E31E24] border-gray-300 focus:ring-[#E31E24]"
            />
          </div>
          <div className="ml-3 text-sm">
            <span className="font-bold text-gray-700">
              Inside Dhaka - Regular Delivery :{' '}
            </span>
            <span className="font-bold text-[#E31E24]">Tk. 60</span>
            <div className="text-gray-500 text-xs mt-0.5">
              (Delivery within 48 Hours)
            </div>
          </div>
        </label>

        {/* Option 2 */}
        <label className="flex items-start p-3 cursor-pointer hover:bg-gray-50">
          <div className="flex items-center h-5">
            <input
              type="radio"
              name="delivery"
              value="outside"
              checked={selected === 'outside'}
              onChange={() => setSelected('outside')}
              className="w-4 h-4 text-[#E31E24] border-gray-300 focus:ring-[#E31E24]"
            />
          </div>
          <div className="ml-3 text-sm">
            <span className="font-bold text-gray-700">
              Outside Dhaka - Regular Delivery :{' '}
            </span>
            <span className="font-bold text-[#E31E24]">Tk. 120</span>
            <div className="text-gray-500 text-xs mt-0.5">
              (Delivery within 3-7 Days)
            </div>
          </div>
        </label>
      </div>
    </div>
  )
}
