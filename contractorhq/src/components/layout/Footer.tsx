import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { Button } from "../ui/Button";

export default function Footer() {
  return (
    <footer className="bg-theme-hero text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold">
                <span className="text-dark">Contractor</span>
                <span className="text-primary-light">HQ</span>
              </span>
            </Link>
            <p className="text-primary-lighter/90 mb-6 max-w-md">
              Premium tools and equipment for professional contractors. Quality
              you can trust for every job.
            </p>
            <div className="flex gap-5">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-2 rounded-full bg-primary-light/20 hover:bg-primary-light/30 text-primary-lighter hover:text-white transition-all"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white border-b border-primary-light pb-2">
              Shop
            </h3>
            <ul className="space-y-3">
              {["All Products", "Brands", "Special Deals", "New Arrivals"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-primary-lighter/90 hover:text-white transition-colors flex items-start gap-2"
                    >
                      <span className="mt-1 h-1 w-1 rounded-full bg-accent-light opacity-0 hover:opacity-100 transition-opacity" />
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-white border-b border-primary-light pb-2">
              Support
            </h3>
            <ul className="space-y-3">
              {["Contact Us", "FAQ", "Returns Policy", "Shipping Info"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/support#${item.toLowerCase().replace(" ", "")}`}
                      className="text-primary-lighter/90 hover:text-white transition-colors flex items-start gap-2"
                    >
                      <span className="mt-1 h-1 w-1 rounded-full bg-accent-light opacity-0 hover:opacity-100 transition-opacity" />
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-5 text-white border-b border-primary-light pb-2">
              Stay Updated
            </h3>
            <p className="text-primary-lighter/90 mb-4">
              Subscribe for exclusive deals and industry tips
            </p>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3.5 h-4 w-4 text-primary-lighter/70" />
              <input
                type="email"
                placeholder="Your email"
                className="w-full pl-10 pr-4 py-3 mb-2 rounded-lg bg-primary-light/20 border border-primary-light/30 focus:border-accent-light text-white placeholder-primary-lighter/70 focus:outline-none focus:ring-1 focus:ring-accent-light/50"
              />
              <Button variant="accent" size="lg" className="w-full">
                Subscribe
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-primary-light/30 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-lighter/80">
              © {new Date().getFullYear()} ContractorHQ. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/legal"
                className="text-sm text-primary-lighter/80 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal"
                className="text-sm text-primary-lighter/80 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/legal/sitemap"
                className="text-sm text-primary-lighter/80 hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
