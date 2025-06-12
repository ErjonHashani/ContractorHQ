"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  isOnSale: boolean;
  category: string;
}

type BrandName = "Makita" | "DeWalt" | "Bosch" | "Milwaukee" | "Stihl";

export default function BrandPage() {
  const { brand } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const brandColors: { [key in BrandName]: string } = {
    Makita: "text-teal-500",
    DeWalt: "text-yellow-500",
    Bosch: "text-lightblue-500",
    Milwaukee: "text-red-500",
    Stihl: "text-orange-500",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!brand) return;

      setIsLoading(true);
      try {
        const response = await fetch(`/api/products/brands/${brand}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [brand]);

  if (!brand)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-primary">Loading brand...</div>
      </div>
    );

  const brandColorClass = brandColors[brand as BrandName] || "text-gray-900";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-center">
          <div className="inline-block bg-white p-3 rounded-xl shadow-sm mb-6">
            <h1 className="text-4xl font-bold">
              <span className={brandColorClass}>{brand}</span> Products
            </h1>
          </div>

          <Button
            onClick={() => router.push("/brands")}
            className="group md:absolute left-5 inline-flex justify-center items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-lg shadow-xs hover:shadow-sm transition-all mb-8"
            variant="secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Brands
          </Button>
        </div>

        {/* Status Section */}
        <div className="mb-10">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-red-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-blue-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-blue-700 font-medium">
                  No products found for this brand.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-700">
                Showing <span className="font-semibold">{products.length}</span>{" "}
                products
              </h2>
              <div className="text-sm text-gray-500">{brand} collection</div>
            </div>
          )}
        </div>

        {/* Products Grid - Unchanged except for container styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
