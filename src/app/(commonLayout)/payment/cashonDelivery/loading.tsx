const loading = () => {
  return (
    <div>
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-white">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-[#000000]"></div>

        <h2 className="mt-6 text-xl font-semibold text-gray-800">
          Processing your Order
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Please wait while we confirm your order details.
        </p>
      </div>
    </div>
  );
};

export default loading;
