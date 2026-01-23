"use client";
import React, { useActionState, useEffect, useState } from "react";
import { ArrowRight, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { registerClient } from "@/services/auth/registerUser";
import { Toast } from "@/components/shared/Toast/Toast";

interface SignUpProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SignUp: React.FC<SignUpProps> = ({ isLoading, setIsLoading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(registerClient, null);
  console.log(state);

  // sync server pending → parent loader (NO UI change)
  useEffect(() => {
     if (state && !state.success && state.message) {
          Toast.fire({
            icon: "error",
            title: state?.message || "Login failed",
          });
        }
    setIsLoading(isPending);
  }, [isPending, setIsLoading]);

  return (
    <form action={formAction} className="space-y-5">
      {/* Name */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wider ml-1">
          Full Name
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors duration-300" />
          </div>
          <input
            type="text"
            name="name"
            className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 text-sm"
            placeholder="John Doe"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wider ml-1">
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors duration-300" />
          </div>
          <input
            type="email"
            name="email"
            className="block w-full pl-11 pr-11 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 text-sm"
            placeholder="name@example.com"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wider ml-1">
          Password
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors duration-300" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="block w-full pl-11 pr-11 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 text-sm"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-black transition-colors cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl mt-6"
      >
        <span className="flex items-center tracking-wide uppercase">
          {isPending ? "Processing..." : "Sign In"}
          {!isPending && (
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          )}
        </span>
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-4 bg-white/70 text-gray-500 font-medium">OR</span>
        </div>
      </div>

      {/* Google Sign In Button */}
      <button
        type="button"
        className="cursor-pointer w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-gray-300 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99]"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      {/* Footer Text */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-xs">
          By continuing, you agree to our{" "}
          <a href="#" className="text-black font-medium hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-black font-medium hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </form>
  );
};

export default SignUp;
