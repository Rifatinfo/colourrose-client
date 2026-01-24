/* eslint-disable @typescript-eslint/no-explicit-any */
export const createOrder = async (payload: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ send cookies
      body: JSON.stringify(payload),
    }
  );

  // ❌ Backend error (401, 403, 500, etc)
  if (!res.ok) {
    const contentType = res.headers.get("content-type");

    // ✅ Backend returned JSON error
    if (contentType?.includes("application/json")) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Checkout failed");
    }

    throw new Error("Unauthorized or Server Error");
  }

  // ✅ Success response
  const data = await res.json();
  console.log("Order API Success:", data);
  return data;
};


