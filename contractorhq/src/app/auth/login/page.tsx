"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  FaEnvelope,
  FaLock,
  FaUserCircle,
  FaArrowRight,
} from "react-icons/fa";
import validator from "validator";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!validator.isEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      setError("Invalid email or password.");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Parallax Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-indigo-900/80"></div>
        <div
          className="absolute inset-0 bg-[url('https://cdn.thewirecutter.com/wp-content/media/2020/12/powerdrills-2048px-0768.jpg')] 
          bg-cover bg-center opacity-30"
          style={{ backgroundAttachment: "fixed" }}
        ></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-50/80 flex items-center justify-center border-4 border-white shadow-md">
                <FaUserCircle className="text-blue-600 text-5xl" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Sign in to continue your journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Remember me and Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full py-3.5 px-4 rounded-xl font-medium text-white shadow-lg hover:shadow-xl transition-all group"
                disabled={loading}
              >
                <span className="flex items-center justify-center">
                  {loading ? (
                    "Signing in..."
                  ) : (
                    <>
                      Continue
                      <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </Button>

              <div className="text-center text-sm text-gray-500">
                New to our platform?{" "}
                <Link
                  href="/auth/signup"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
