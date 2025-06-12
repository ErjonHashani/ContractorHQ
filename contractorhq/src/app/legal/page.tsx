import React from "react";
import Link from "next/link";

const LegalPage = () => {
  return (
    <div className="max-w-4xl mx-auto min-h-screen p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-12">
        Legal Information
      </h1>

      {/* Responsive Grid for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 - Privacy Policy */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link
            href="/legal/privacy"
            className="block p-6 text-center hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-2xl font-semibold text-accent mb-4">
              Privacy Policy
            </h2>
            <p className="text-gray-600">
              Learn about how we protect your privacy and manage your data.
            </p>
          </Link>
        </div>

        {/* Card 2 - Terms of Service */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link
            href="/legal/terms"
            className="block p-6 text-center hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-2xl font-semibold text-accent mb-4">
              Terms of Service
            </h2>
            <p className="text-gray-600">
              Understand the terms and conditions of using our website and
              services.
            </p>
          </Link>
        </div>

        {/* Card 3 - Sitemap */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link
            href="/legal/sitemap"
            className="block p-6 text-center hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-2xl font-semibold text-accent mb-4">
              Sitemap
            </h2>
            <p className="text-gray-600">
              Navigate through the structure of our website and its pages.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
