'use client'
import  { useState } from 'react'
export function PaymentOptions() {
  const [method, setMethod] = useState('bkash')
  return (
    <div className="mb-8">
      <h2 className="text-[#333333] font-bold uppercase text-sm mb-4">
        Payment Option
      </h2>

      {/* Terms Checkbox */}
      <div className="mb-6 flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            className="w-4 h-4 border-gray-300 text-[#E31E24] focus:ring-[#E31E24]"
          />
        </div>
        <div className="ml-2 text-xs text-gray-700 font-bold">
          <label htmlFor="terms">I agree the </label>
          <a href="#" className="text-[#E31E24]">
            Terms & Conditions
          </a>
          <span> , </span>
          <a href="#" className="text-[#E31E24]">
            Privacy Policy
          </a>
          <span> & </span>
          <a href="#" className="text-[#E31E24]">
            Refund & Return Policy
          </a>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white border border-gray-200">
        {/* bKash Option */}
        <div className="border-b border-gray-100">
          <label className="flex items-center p-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="bkash"
              checked={method === 'bkash'}
              onChange={() => setMethod('bkash')}
              className="w-4 h-4 text-[#E31E24] border-gray-300 focus:ring-[#E31E24]"
            />
            <span className="ml-3 text-sm font-bold text-gray-700 flex-1">
              bKash
            </span>
            <div className="flex items-center">
              <span className="text-[#E31E24] font-bold italic text-lg mr-1">
                bKash
              </span>
              <div className="w-6 h-6 bg-[#E31E24] transform rotate-45 relative -ml-2 z-[-1]"></div>
            </div>
          </label>
        </div>

        {/* Pay Online Option */}
        <div>
          <label className="flex items-center p-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="online"
              checked={method === 'online'}
              onChange={() => setMethod('online')}
              className="w-4 h-4 text-[#E31E24] border-gray-300 focus:ring-[#E31E24]"
            />
            <span className="ml-3 text-sm font-bold text-gray-700 uppercase">
              Pay Online
            </span>
          </label>

          {/* Card Logos */}
          <div className="px-10 pb-4 flex flex-wrap gap-2">
            <div className="h-8 w-12 bg-[#0a2556] flex items-center justify-center rounded text-white text-[8px] font-bold">
              VISA
            </div>
            <div className="h-8 w-12 bg-[#eb001b] flex items-center justify-center rounded text-white text-[8px] font-bold">
              Master
            </div>
            <div className="h-8 w-12 bg-[#006fcf] flex items-center justify-center rounded text-white text-[8px] font-bold">
              AMEX
            </div>
            <div className="h-8 w-12 bg-[#ff5f00] flex items-center justify-center rounded text-white text-[8px] font-bold">
              Discover
            </div>
            <div className="h-8 w-12 bg-[#003087] flex items-center justify-center rounded text-white text-[8px] font-bold">
              PayPal
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
