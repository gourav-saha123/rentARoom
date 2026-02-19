import { useState } from "react";
import { Mail, Lock } from 'lucide-react';
// import api from "../api/axios";
// import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const { checkAuth } = useAuth();
  const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/auth/login", { email, password });
//       await checkAuth();
//       navigate("/");
//     } catch (err) {
//       alert("Login failed");
//     }
//   };

//   const handleGoogleLogin = () => {
//     alert("Google Login not implemented yet");
//   };

  return (
    <div className="h-screen overflow-hidden flex bg-[#0F0F0F] font-sans text-gray-100">
      {/* Left Side - Form (1/3) */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-center p-6 bg-[#0F0F0F] relative z-10 h-full border-r border-gray-800">
        <div className="w-full max-w-sm">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-start mb-6">
            <img src="/src/assets/logo.png" alt="Logo" className="w-13 h-13 mb-2 object-contain" />
            <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Welcome back</h1>
            <p className="text-sm text-gray-400">Welcome to Tentacles — Please enter your details.</p>
          </div>

          <div className="w-full h-px bg-gray-800 mb-6"></div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-3">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 bg-[#1A1A1A] border border-gray-700 rounded-lg placeholder-gray-600 text-sm text-white focus:outline-none focus:border-[#87E64B] focus:ring-1 focus:ring-[#87E64B] transition-all duration-200"
                    placeholder="hi@tentacles.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 bg-[#1A1A1A] border border-gray-700 rounded-lg placeholder-gray-600 text-sm text-white focus:outline-none focus:border-[#87E64B] focus:ring-1 focus:ring-[#87E64B] transition-all duration-200"
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3 pt-1">
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-bold text-black bg-[#87E64B] hover:bg-[#96f05d] transition-all duration-200 shadow-lg shadow-[#87E64B]/10"
              >
                Sign in
              </button>
              
              <button
                type="button"
                // onClick={handleGoogleLogin}
                className="w-full flex justify-center py-2.5 px-4 border border-gray-700 rounded-lg text-sm font-bold text-gray-300 bg-transparent hover:bg-gray-800 transition-all duration-200"
              >
                <span className="flex items-center">
                   <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                   </svg>
                   Sign in with Google
                </span>
              </button>
            </div>
            
             <div className="text-center mt-6">
                <span className="text-xs text-gray-500">Don't have an account? </span>
                <a href="/register" className="text-xs font-bold text-[#87E64B] hover:text-[#96f05d] transition-colors">
                  Sign up
                </a>
              </div>
          </form>
        </div>
      </div>

      {/* Right Side - Full Screen Image Section */}
      <div className="hidden md:block md:w-2/3 h-screen bg-[#0F0F0F] relative">
        <img
          src="/src/assets/login.jpg"
          alt="Login Background"
          className="w-full h-full object-cover"
        />
        
        {/* All-edge Vignette Overlay - Bright center fading to black on all sides */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            background: 'radial-gradient(circle at center, transparent 10%, rgba(15, 15, 15, 0.4) 50%, rgba(15, 15, 15, 0.9) 85%, #0F0F0F 100%)'
          }}
        ></div>

        {/* Seamless left-side blend into form panel */}
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0F0F0F] to-transparent"></div>
      </div>
    </div>
  );
};

export default Login;