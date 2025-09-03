// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/useAuth";

// export default function Header() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <header className="w-full border-b bg-white">
//       <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
//         <Link to="/" className="font-bold">
//           DevPizza
//         </Link>
//         <nav className="flex items-center gap-4">
//           <Link to="/" className="text-sm">
//             Home
//           </Link>
//           {user ? (
//             <>
//               <span className="text-sm text-gray-600">{user.email}</span>
//               <button
//                 onClick={handleLogout}
//                 className="text-sm bg-black text-white px-3 py-1 rounded"
//               >
//                 Sair
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="text-sm">
//                 Login
//               </Link>
//               <Link to="/register" className="text-sm">
//                 Cadastro
//               </Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }
