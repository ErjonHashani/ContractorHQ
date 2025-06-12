"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "./Button";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  isOnSale: boolean;
  category: string;
}

export default function FeaturedSection({ products }: { products: Product[] }) {
  return (
    <motion.section
      className="py-20 px-6 bg-light shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark">Featured Products</h1>
        <p className="text-lg text-gray-500 mt-2">
          Check out our most popular items and bestsellers!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="text-center mt-16">
        <Link href="/shop">
          <Button className="transition-colors"
          variant="secondary"
          size="lg">
            View All Products
          </Button>
        </Link>
      </div>
    </motion.section>
  );
}
