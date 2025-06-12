/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

interface BrandInfo {
  name: string;
  description: string;
  logo: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  isOnSale: boolean;
}

export const useBrandProducts = (brand: string) => {
  const [brandInfo, setBrandInfo] = useState<BrandInfo | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!brand) return;

    const fetchBrandData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/brands/${brand}`);
        const data = await response.json();
        if (response.ok) {
          setBrandInfo(data.brandInfo);
          setProducts(data.products);
        } else {
          setError(data.message || "An error occurred");
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
  }, [brand]);

  return { brandInfo, products, loading, error };
};
