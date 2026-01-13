import { DeliveryAddressForm } from "./_components/DeliveryAddressForm";
import { DeliveryOptions } from "./_components/DeliveryOptions";
import { OrderSummary } from "./_components/OrderSummary";
import { PaymentOptions } from "./_components/PaymentOptions";
import { ShoppingCart } from "./_components/ShoppingCart";

const CheckoutPage = () => {
  return (
    <div className="">
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold uppercase text-[#333333] mb-6 border-b border-gray-200 pb-2">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (Cart, Delivery, Summary) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <ShoppingCart />
            <DeliveryOptions />
            <OrderSummary />
          </div>

          {/* Right Column (Address, Payment) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <DeliveryAddressForm />
            <PaymentOptions />
          </div>
        </div>
      </main>
    </div>
  )
}

export default CheckoutPage;