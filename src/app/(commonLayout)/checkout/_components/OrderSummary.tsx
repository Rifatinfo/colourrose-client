import { deliveryOptions } from "@/config/deliveryOptions";
import { useCart } from "@/context/CartContext";

type Props = {
  selectedDelivery: string;
};

export function OrderSummary({ selectedDelivery }: Props) {
    const { cart } = useCart();

    const productCount = cart.reduce((total, item) => total + item.quantity, 0);
    const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryCharge = deliveryOptions.find((d) => d.id  === selectedDelivery)?.price || 0;

    const gradTotal = subTotal + deliveryCharge;
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
            <span className="font-semibold text-gray-900">{productCount}</span>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed"></div>

          {/* Payable */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Payable Amount</span>
            <span className="font-semibold text-gray-900">Tk. {subTotal}</span>
          </div>

          {/* Delivery */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Delivery Charge</span>
            <span className="font-semibold text-gray-900">Tk. {deliveryCharge}</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Grand Total */}
          <div className="flex justify-between items-center rounded-xl bg-gray-50 px-4 py-3">
            <span className="text-base font-semibold text-gray-900">
              Grand Total
            </span>
            <span className="text-lg font-bold text-[#E31E24]">
              Tk. {gradTotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}