"use client";

import { useEffect, useState } from "react";

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  isOnSale: boolean;
  image: string;
  images?: string[];
  description: string;
}

export function useFetchProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url =
        typeof window !== "undefined"
          ? `${window.location.origin}/api/products`
          : "/api/products"; // fallback

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
}
