// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";

// export const createOrder = async (payload: any) => {
//   // 1. Get the token (adjust 'token' to the key you use in localStorage)
//   const token = localStorage.getItem("accessToken"); 

//   const res = await axios.post(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/order`, 
//     payload, 
//     {
//       withCredentials: true,
//       headers: {
//         // 2. Attach the token here
//         Authorization: `Bearer ${token}`, 
//       },
//     }
//   );
  
//   console.log("result", res.data);
//   return res.data;
// };