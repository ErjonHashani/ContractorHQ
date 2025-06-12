"use client";

import { useRouter } from "next/navigation";
import { BsEmojiFrown } from "react-icons/bs";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-light to-gray-hundred p-6">
      <div className="text-center max-w-md mx-auto">
        <BsEmojiFrown className="mx-auto mb-6 text-9xl text-primary-light opacity-80" />
        <div className="mb-6 text-8xl font-bold text-gray-7 opacity-90">
          404
        </div>
        <h1 className="text-2xl font-semibold text-gray-7 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-five mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Please check the URL or return to the homepage.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-primary-light hover:bg-primary text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Return to Homepage
        </button>
      </div>
    </main>
  );
}
