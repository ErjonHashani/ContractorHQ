import Link from "next/link";
import React from "react";

const SitemapPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-12">Sitemap</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Home Page */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link
            href="/"
            className="block p-6 text-center hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-2xl font-semibold text-accent mb-4">Home</h2>
            <p className="text-gray-600">
              The main page with all the latest updates and featured products.
            </p>
          </Link>
        </div>

        {/* Shop (Products) Page */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link
            href="/shop"
            className="block p-6 text-center hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-2xl font-semibold text-accent mb-4">Shop</h2>
            <p className="text-gray-600">
              Browse our extensive selection of construction tools, drills, and
              more.
            </p>
          </Link>
        </div>

        {/* Brands Page */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link
            href="/brands"
            className="block p-6 text-center hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-2xl font-semibold text-accent mb-4">Brands</h2>
            <p className="text-gray-600">
              Explore the top construction tool brands we offer, such as Makita,
              Bosch, and more.
            </p>
          </Link>
        </div>

        {/* About Us Page */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link
            href="/about"
            className="block p-6 text-center hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-2xl font-semibold text-accent mb-4">
              About Us
            </h2>
            <p className="text-gray-600">
              Learn about ContractorHQ, our values, and our mission in the
              construction industry.
            </p>
          </Link>
        </div>

        {/* Support Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-6 flex items-center text-center flex-col hover:bg-gray-50 transition-colors">
            <h2 className="text-2xl font-semibold text-accent mb-4">Support</h2>
            <p className="text-gray-600 mb-4">
              Get help with any questions or issues you may have. Choose one of
              the options below:
            </p>

            <div className="space-y-2 text-base flex flex-wrap gap-5">
              <Link
                href="/support/contact"
                className="block text-accent-light hover:underline"
              >
                Contact
              </Link>
              <Link
                href="/support/FAQ"
                className="block text-accent-light hover:underline"
              >
                FAQ
              </Link>
              <Link
                href="/support/returnsPolicy"
                className="block text-accent-light hover:underline"
              >
                Returns Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Pages */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link
            href="/legal"
            className="block p-6 text-center hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-2xl font-semibold text-accent mb-4">Legal</h2>
            <p className="text-gray-600">
              View our legal pages, including Privacy Policy, Terms of Service,
              and more.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
