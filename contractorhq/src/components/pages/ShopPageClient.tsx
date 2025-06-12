"use client";

import { useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import Footer from "../layout/Footer";
import { FiFilter } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  isOnSale: boolean;
  brand: string;
  category: string;
}

interface ShopPageClientProps {
  products: Product[];
  initialCategory: string;
}

export default function ShopPageClient({
  products,
  initialCategory,
}: ShopPageClientProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => setIsFilterVisible(!isFilterVisible);

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === "all") router.push("/shop");
    else router.push(`/shop?category=${newCategory}`);
    setIsFilterVisible(false);
    setSelectedCategory(newCategory);
  };

  return (
    <>
      <div className="px-4 py-8 relative bg-light">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">Shop</span>
            {selectedCategory !== "all" && (
              <>
                <span className="mx-2">/</span>
                <span className="capitalize">
                  {selectedCategory === "deals"
                    ? "Special Deals"
                    : selectedCategory === "new"
                    ? "New Arrivals"
                    : "All Products"}
                </span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold text-dark">
              {selectedCategory === "deals"
                ? "Special Deals"
                : selectedCategory === "new"
                ? "New Arrivals"
                : "All Products"}
            </h1>

            <div className="flex items-center gap-4 relative">
              <button
                onClick={toggleFilterVisibility}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-light transition-colors"
              >
                <FiFilter className="h-5 w-5 text-dark" />
                <span className="text-dark">Filter</span>
              </button>

              {isFilterVisible && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-20">
                  <h3 className="text-lg font-semibold p-4 border-b border-gray-100 text-gray-800">
                    Filter by Category
                  </h3>
                  <div className="flex flex-col p-4 gap-2">
                    {["all", "deals", "new"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`py-2 px-4 text-gray-700 rounded-lg hover:bg-gray-100 ${
                          selectedCategory === cat ? "bg-gray-200" : ""
                        }`}
                      >
                        {cat === "all"
                          ? "All Products"
                          : cat === "deals"
                          ? "Special Deals"
                          : "New Arrivals"}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product grid */}
        {products.length === 0 ? (
          <div className="text-center min-h-screen">
            <p className="text-lg text-gray-500">No products found</p>
            <Link
              href="/shop"
              className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  isOnSale: product.isOnSale,
                  category: product.category,
                }}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
