"use client";

import React from "react";
import Link from "next/link";

const LegalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-100 py-6 px-10 space-y-6 border-r border-r-gray-200 sticky top-6 max-h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-700">Legal Pages</h2>
        <nav className="flex flex-col gap-6">
          <ul>
            <li>
              <Link
                href="/legal/privacy"
                className="text-accent hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/legal/terms"
                className="text-accent hover:underline"
              >
                Terms of Use
              </Link>
            </li>
            <li>
              <Link
                href="/legal/sitemap"
                className="text-accent hover:underline"
              >
                Sitemap
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default LegalLayout;
