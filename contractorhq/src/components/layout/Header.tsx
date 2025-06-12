"use client";

import Link from "next/link";
import {
  FiSearch,
  FiShoppingCart,
  FiChevronDown,
  FiHome,
  FiShoppingBag,
  FiHelpCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cart";
import ThemeToggle from "../theme/ThemeToggle";
import AuthButtons from "../auth/AuthButtons";

export default function Header() {
  const shopLinks = {
    allProducts: "/shop",
    specialDeals: "/shop?category=deals",
    newArrivals: "/shop?category=new",
  };

  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // State to toggle mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  // Get cart items count from store
  const cartItemsCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-50 bg-light shadow-sm border-b-1 border-gray-light">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Mobile Menu - Hamburger */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-dark hover:text-primary focus:outline-none"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            {mobileMenuOpen ? (
              <FiX className="block h-6 w-6" />
            ) : (
              <FiMenu className="block h-6 w-6" />
            )}
          </button>
        </div>
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center hover:scale-105 duration-200 mx-auto lg:mx-0"
        >
          <Image
            src="/images/logos/contractor-logo.png"
            alt="ContractorHQ Logo"
            width={160}
            height={40}
            className="object-contain hidden lg:block"
            priority={true}
          />
          <Image
            src="/images/logos/contractor-logo.png"
            alt="ContractorHQ"
            width={120}
            height={30}
            className="block lg:hidden object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className="font-medium text-dark hover:text-primary transition-colors duration-200 flex items-center gap-1"
          >
            <FiHome className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <div className="relative group">
            <div className="font-medium text-dark hover:text-primary transition-colors duration-200 flex items-center gap-1 cursor-pointer">
              <Link href="/shop" className="flex items-center gap-1">
                <FiShoppingBag className="w-4 h-4" />
                Shop
              </Link>
              <FiChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[240px] bg-light rounded-lg shadow-xl py-2 z-50 border-1 border-gray-light invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
              <div className="px-4 py-2 border-b border-light">
                <h3 className="text-sm font-semibold text-dark">
                  Shop Categories
                </h3>
              </div>
              <Link
                href={shopLinks.allProducts}
                className="block px-4 py-2.5 text-sm text-dark hover:bg-gray-hundred transition-colors duration-150 group/item"
              >
                <span className="group-hover/item:ml-1 transition-all duration-150">
                  All Products
                </span>
              </Link>
              <Link
                href={shopLinks.specialDeals}
                className="block px-4 py-2.5 text-sm text-dark hover:bg-gray-hundred transition-colors duration-150 group/item"
              >
                <span className="group-hover/item:ml-1 transition-all duration-150">
                  Special Deals
                </span>
              </Link>
              <Link
                href={shopLinks.newArrivals}
                className="block px-4 py-2.5 text-sm text-dark hover:bg-gray-hundred transition-colors duration-150 group/item"
              >
                <span className="group-hover/item:ml-1 transition-all duration-150">
                  New Arrivals
                </span>
              </Link>
              <div className="relative group/brands">
                <div className="flex justify-between items-center px-4 py-2.5 text-sm text-dark hover:bg-gray-hundred transition-colors duration-150 cursor-pointer">
                  <span className="group-hover/brands:ml-1 transition-all duration-150">
                    Brands
                  </span>
                  <FiChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/brands:rotate-180" />
                </div>
                <div className="absolute top-0 left-full ml-1 w-64 bg-light rounded-r-lg shadow-xl border-1 border-gray-light opacity-0 group-hover/brands:opacity-100 invisible group-hover/brands:visible transition-all duration-200 transform group-hover/brands:translate-x-0 -translate-x-1">
                  <div className="px-4 py-2 border-b border-light">
                    <h3 className="text-sm font-semibold text-dark">
                      Featured Brands
                    </h3>
                  </div>
                  <Link
                    href="/brands/Makita"
                    className="block px-4 py-3 hover:bg-gray-hundred transition-colors duration-150"
                  >
                    <div className="relative w-[120px] h-6">
                      <Image
                        src="/images/brands/makita-logo.png"
                        alt="Makita"
                        fill={true}
                        className="object-contain object-left"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <Link
                    href="/brands/DeWalt"
                    className="block px-4 py-3 hover:bg-gray-hundred transition-colors duration-150"
                  >
                    <div className="relative h-6 w-[120px]">
                      <Image
                        src="/images/brands/dewalt-logo.png"
                        alt="DeWalt"
                        fill={true}
                        className="object-contain object-left"
                        sizes="120px"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <Link
                    href="/brands/Milwaukee"
                    className="block px-4 py-3 hover:bg-gray-hundred transition-colors duration-150"
                  >
                    <div className="relative h-6 w-[120px]">
                      <Image
                        src="/images/brands/milwaukee-logo.png"
                        alt="Milwaukee"
                        fill={true}
                        className="object-contain object-left"
                        sizes="120px"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <Link
                    href="/brands"
                    className="block px-4 py-2.5 text-sm font-medium text-dark mt-1 transition-colors duration-150"
                  >
                    View All Brands →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/blogs"
            className="font-medium text-dark hover:text-primary transition-colors duration-200 flex gap-1 items-center"
          >
            <FaRegNewspaper className="w-4 h-4" />
            Blogs
          </Link>

          <div className="relative group">
            <div className="font-medium text-dark hover:text-primary cursor-pointer">
              <Link href="/support" className="flex items-center gap-1">
                <FiHelpCircle className="w-4 h-4" />
                Support
                <FiChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </Link>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-light rounded-lg shadow-xl py-2 z-50 border-1 border-gray-light invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
              <div className="px-4 py-2 border-b border-light">
                <h3 className="text-sm font-semibold text-dark">
                  Support Center
                </h3>
              </div>
              <Link
                href="/support#contact"
                className="block px-4 py-2.5 text-sm text-dark hover:bg-gray-hundred transition-colors duration-150 group/item"
              >
                <span className="group-hover/item:ml-1 transition-all duration-150">
                  Contact Us
                </span>
              </Link>
              <Link
                href="/support#faq"
                className="block px-4 py-2.5 text-sm text-dark hover:bg-gray-hundred transition-colors duration-150 group/item"
              >
                <span className="group-hover/item:ml-1 transition-all duration-150">
                  FAQ
                </span>
              </Link>
              <Link
                href="/support#returns"
                className="block px-4 py-2.5 text-sm text-dark hover:bg-gray-hundred transition-colors duration-150 group/item"
              >
                <span className="group-hover/item:ml-1 transition-all duration-150">
                  Returns Policy
                </span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="group relative items-center hidden lg:flex">
            <div className="z-10 p-2 group-hover:pr-3 transition-all duration-300">
              <FiSearch
                className="h-5 w-5 text-dark group-hover:text-primary cursor-pointer"
                onClick={() => {
                  if (searchTerm.trim()) {
                    router.push(
                      `/search?q=${encodeURIComponent(
                        searchTerm.trim()
                      )}&t=${Date.now()}`
                    );
                  }
                }}
              />
            </div>
            <div className="absolute right-0 w-0 group-hover:w-64 overflow-hidden transition-all duration-300 ease-in-out">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchTerm.trim()) {
                    router.replace(
                      `/search?q=${encodeURIComponent(searchTerm.trim())}`
                    );
                  }
                }}
                className="w-full h-10 pl-10 pr-4 border border-gray-200 bg-light text-dark rounded-full focus:border-primary"
              />
            </div>
          </div>

          {/* Right side icons - RIGHT */}
          <div className="flex items-center justify-end">
            {/* Cart */}
            <Link href="/cart" className="p-2 relative">
              <FiShoppingCart className="h-6 w-6 text-dark hover:text-primary" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-primary rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle (hidden on mobile) */}
            <div className="hidden sm:block ml-2">
              <ThemeToggle />
            </div>

            {/* Auth Buttons */}
            <div className="ml-2">
              <AuthButtons />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        data-testid="mobile-menu-panel"
        className={`lg:hidden fixed inset-0 top-[75px] bg-light z-40 overflow-y-auto transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <nav className="flex flex-col space-y-6">
            {/* Static Search Bar - Mobile Header*/}
            <div className="flex items-center p-2 w-full">
              <FiSearch
                className="h-5 w-5 text-dark mr-2 cursor-pointer"
                onClick={() => {
                  if (searchTerm.trim()) {
                    router.push(
                      `/search?q=${encodeURIComponent(
                        searchTerm.trim()
                      )}&t=${Date.now()}`
                    );
                    setMobileMenuOpen(false);
                  }
                }}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchTerm.trim()) {
                    router.replace(
                      `/search?q=${encodeURIComponent(searchTerm.trim())}`
                    );
                    setMobileMenuOpen(false);
                  }
                }}
                className="flex-1 h-10 pl-4 pr-4 border border-gray-200 bg-light text-dark rounded-lg focus:border-primary"
              />
            </div>

            {/* Home */}
            <Link
              href="/"
              className="flex items-center gap-3 text-lg font-medium text-dark py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiHome className="w-5 h-5" />
              Home
            </Link>

            {/* Shop Dropdown */}
            <div>
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="flex justify-between w-full items-center text-lg font-medium text-dark py-2"
              >
                <span className="flex items-center gap-3">
                  <FiShoppingBag className="w-5 h-5" />
                  Shop
                </span>
                <FiChevronDown
                  className={`w-5 h-5 transition-transform ${
                    shopOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {shopOpen && (
                <div className="pl-8 mt-2 flex flex-col gap-2">
                  <Link
                    href={shopLinks.allProducts}
                    className="text-gray-six hover:text-primary py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Products
                  </Link>
                  <Link
                    href={shopLinks.specialDeals}
                    className="text-gray-six hover:text-primary py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Special Deals
                  </Link>
                  <Link
                    href={shopLinks.newArrivals}
                    className="text-gray-six hover:text-primary py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    New Arrivals
                  </Link>

                  {/* Brands dropdown inside Shop */}
                  <div>
                    <button
                      onClick={() => setBrandsOpen(!brandsOpen)}
                      className="flex justify-between w-full items-center text-dark py-1"
                    >
                      Brands
                      <FiChevronDown
                        className={`w-4 h-4 transition-transform ${
                          brandsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {brandsOpen && (
                      <div className="pl-4 mt-1 flex flex-col gap-1">
                        <Link
                          href="/brands/Makita"
                          className="text-gray-six hover:text-primary py-0.5"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Makita
                        </Link>
                        <Link
                          href="/brands/DeWalt"
                          className="text-gray-six hover:text-primary py-0.5"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          DeWalt
                        </Link>
                        <Link
                          href="/brands/Milwaukee"
                          className="text-gray-six hover:text-primary py-0.5"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Milwaukee
                        </Link>
                        <Link
                          href="/brands"
                          className="text-dark hover:text-primary py-0.5 font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          View All Brands
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Blogs */}
            <Link
              href="/blogs"
              className="flex items-center gap-3 text-lg font-medium text-dark py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaRegNewspaper className="w-5 h-5" />
              Blogs
            </Link>

            {/* Support Dropdown */}
            <div>
              <button
                onClick={() => setSupportOpen(!supportOpen)}
                className="flex justify-between w-full items-center text-lg font-medium text-dark py-2"
              >
                <span className="flex items-center gap-3 text-dark">
                  <FiHelpCircle className="w-5 h-5" />
                  Support
                </span>
                <FiChevronDown
                  className={`w-5 h-5 transition-transform ${
                    supportOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {supportOpen && (
                <div className="pl-8 mt-2 flex flex-col gap-2">
                  <Link
                    href="/support#contact"
                    className="text-gray-six hover:text-primary py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/support#faq"
                    className="text-gray-six hover:text-primary py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/support#returns"
                    className="text-gray-six hover:text-primary py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Returns Policy
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
