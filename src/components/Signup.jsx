// // src/Signup.js
// import React, { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./firebase";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       navigate("/dashboard");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleSignup}
//         className="bg-white p-6 rounded shadow-md w-80"
//       >
//         <h2 className="text-xl mb-4 font-bold">Sign Up</h2>
//         <input
//           className="w-full p-2 border border-gray-300 rounded mb-3 bg-gray-500"
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           className="w-full p-2 border border-gray-300 rounded mb-3 bg-gray-500"
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
//           type="submit"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
