// app/support/page.tsx
"use client";

import ContactUs from "@/components/ui/ContactUs";
import FAQ from "@/components/ui/FAQ";
import ReturnsPolicy from "@/components/ui/ReturnsPolicy";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function SupportPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-dark mb-4">Support Center</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            How can we help you today? Browse our support options or contact our
            team directly.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <Button
            variant="ghost"
            size="lg"
            className="border border-gray-200 hover:border-primary-lighter"
          >
            <a href="#contact">Contact Us</a>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="border border-gray-200 hover:border-primary-lighter"
          >
            <a href="#faq">FAQ</a>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="border border-gray-200 hover:border-primary-lighter"
          >
            <a href="#returns">Returns Policy</a>
          </Button>
        </div>

        {/* Sections */}
        <div className="max-w-4xl mx-auto space-y-20">
          <section id="contact" className="scroll-mt-20">
            <ContactUs />
          </section>

          <div className="border-t border-gray-200"></div>

          <section id="faq" className="scroll-mt-20">
            <FAQ />
          </section>

          <div className="border-t border-gray-200"></div>

          <section id="returns" className="scroll-mt-20">
            <ReturnsPolicy />
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="text-center mt-20 text-sm text-gray-500">
          <p>
            Need further assistance?{" "}
            <Link
              href="/shop"
              className="text-primary font-medium hover:underline"
            >
              Browse Products
            </Link>{" "}
            or{" "}
            <a
              href="#contact"
              className="text-primary font-medium hover:underline"
            >
              contact us
            </a>
            .
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
