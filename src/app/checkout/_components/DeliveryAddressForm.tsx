import React from 'react'
export function DeliveryAddressForm() {
  return (
    <div className="mb-8">
      <h2 className="text-[#333333] font-bold uppercase text-sm mb-4">
        Delivery Address
      </h2>

      <form className="space-y-4">
        {/* Name & Mobile Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Name: <span className="text-[#E31E24]">*</span>
            </label>
            <input
              type="text"
              defaultValue="Jael Hardin"
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#E31E24] outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Mobile: <span className="text-[#E31E24]">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#E31E24] outline-none bg-white appearance-none"
                defaultValue="02354786543"
              >
                <option>02354786543</option>
              </select>
              {/* Custom arrow for select */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Email:
          </label>
          <input
            type="email"
            defaultValue="galycu@mailinator.com"
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#E31E24] outline-none bg-white"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Delivery Address: <span className="text-[#E31E24]">*</span>
          </label>
          <textarea
            rows={4}
            defaultValue="Ipsum enim exercitat"
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#E31E24] outline-none bg-white resize-none font-mono"
          />
        </div>
      </form>
    </div>
  )
}
