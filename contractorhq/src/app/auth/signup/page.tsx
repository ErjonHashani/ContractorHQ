"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaUserPlus,
  FaArrowRight,
} from "react-icons/fa";
import validator from "validator";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Frontend validation
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validator.isEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    const isStrong = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    if (!isStrong) {
      setError(
        "Password must be 8+ chars and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (!agreed) {
      setError("You must agree to the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed.");
      } else {
        router.push("/auth/login");
      }
    } catch (err) {
      setError(`Something went wrong. Please try again.  ----> Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Parallax Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-indigo-900/80"></div>
        <div
          className="absolute inset-0 bg-[url('https://djd1xqjx2kdnv.cloudfront.net/photos/32/59/447424_27240_XXL.jpg')] 
          bg-cover bg-center opacity-30"
          style={{ backgroundAttachment: "fixed" }}
        ></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 my-20">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-50/80 flex items-center justify-center border-4 border-white shadow-md">
                <FaUserPlus className="text-blue-600 text-5xl" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Join Our Community
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Start your journey with us today
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

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
                    placeholder="Your email address"
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
                    placeholder="Create a strong password"
                    className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Must include 8+ chars, uppercase, lowercase, number & special
                  character.
                </p>
              </div>

              {/* Terms */}
              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                className="w-full py-3.5 px-4 rounded-xl font-medium text-white shadow-lg hover:shadow-xl transition-all group"
                disabled={loading || !agreed}
              >
                <span className="flex items-center justify-center">
                  {loading ? (
                    "Creating account..."
                  ) : (
                    <>
                      Get Started
                      <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </Button>

              <div className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
