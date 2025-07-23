"use client";

import { useState } from "react";
import { useAuthForm } from "@/hooks/useAuthForm";
import { useRouter } from "next/navigation"; // Correct import for Next.js App Router
import { userLogin, userRegister } from "@/services/auth";

export default function AuthenticationComponent() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { register, handleSubmit, reset, errors, fieldConfig } =
    useAuthForm(isSignUp);
  const router = useRouter();

  const [wait, setIsWait] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null); // 🔔 Track auth error

  async function onSubmit(data: {
    username: string;
    email: string;
    password: string;
  }) {
    setIsWait(true);
    setAuthError(null); // Clear previous error

    try {
      if (isSignUp) {
        await userRegister(data.email, data.username, data.password);
      } else {
        await userLogin(data.email, data.password);
      }

      reset();
      router.push("/engine");
    } catch (err: any) {
      console.error("Auth error:", err.message);
      setAuthError(err.message || "Something went wrong.");
    } finally {
      setIsWait(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 relative">
      {/* Loading overlay */}
      {wait && (
        <div className="absolute inset-0 bg-black opacity-50 z-50 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      )}

      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col w-full max-w-md p-6 gap-4 rounded-xl bg-gray-800 shadow-lg"
      >
        <h2 className="text-white text-2xl font-bold text-center">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        {/* 🔔 Inline auth error */}
        {authError && (
          <p className="text-red-500 text-sm text-center">{authError}</p>
        )}

        {isSignUp && (
          <div>
            <input
              className="w-full rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3"
              placeholder="Username"
              {...register("username", fieldConfig.username)}
              maxLength={30}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">Username is required</p>
            )}
          </div>
        )}

        <div>
          <input
            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3"
            placeholder="Email"
            type="email"
            {...register("email", fieldConfig.email)}
            maxLength={40}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Email is required</p>
          )}
        </div>

        <div>
          <input
            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3"
            placeholder="Password"
            type="password"
            {...register("password", fieldConfig.password)}
            maxLength={30}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={wait}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition disabled:opacity-50"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-sm text-blue-400 cursor-pointer hover:underline mt-2"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </form>
    </div>
  );
}
