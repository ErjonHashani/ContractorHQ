// src/components/pages/SearchPage.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { FiSearch } from "react-icons/fi";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  isOnSale: boolean;
  brand: string;
  category: string;
}

const BRANDS = ["Makita", "DeWalt", "Milwaukee", "Bosch", "Stihl"];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const b = searchParams.get("brand") || "";
    const c = searchParams.get("category") || "";

    setQuery(q);
    setBrand(b);
    setCategory(c);

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (b) params.set("brand", b);
        if (c) params.set("category", c);
        const res = await fetch(`/api/products/search?${params.toString()}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Search failed", err);
      }
      setLoading(false);
    };

    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  useEffect(() => {
    fetch("/api/products/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (brand) params.set("brand", brand);
    if (category) params.set("category", category);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="px-4 py-10 min-h-screen bg-light">
      <h1 className="text-3xl font-bold mb-6">Search Products</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Search</label>
          <div className="flex items-center border border-gray-300 rounded-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-4 py-2 outline-none"
              placeholder="Search by name, brand or category..."
            />
            <button
              onClick={handleSearch}
              className="p-2 text-gray-six hover:text-primary"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="w-full md:w-48">
          <label className="block text-sm font-medium mb-1">Brand</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="" className="text-gray-800">All Brands</option>
            {BRANDS.map((b) => (
              <option className="text-gray-800" key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-48">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="" className="text-gray-800">All Categories</option>
            {categories.map((cat) => (
              <option className="text-gray-800" key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
