"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./Button";
import { useCartStore } from "@/lib/store/cart";
import toast from "react-hot-toast";
import { CartToast } from "./CartToast";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    isOnSale: boolean;
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const showCartToast = (productName: string, quantity: number) => {
    toast.custom((t) => (
      <CartToast productName={productName} quantity={quantity} toastId={t.id} />
    ));
  };

  return (
    <div className="relative group border border-gray-hundred rounded-2xl overflow-hidden bg-gray-hundred hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/20">
      {/* Sale Ribbon - Modern design */}
      {product.isOnSale && (
        <div className="absolute top-4 right-4 z-10 bg-error text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          <span>30% OFF</span>
        </div>
      )}

      {/* Product Image Container */}
      <Link href={`/shop/${product._id}`} className="block overflow-hidden">
        <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-all duration-500 group-hover:scale-105 p-6"
            quality={90}
            priority={false}
            loading="lazy"
          />

          {/* Quick View Overlay - Modern */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <span className="bg-light text-dark font-medium px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Quick View
            </span>
          </div>
        </div>
      </Link>

      {/* Product Info - Modern layout */}
      <div className="p-5 space-y-3">
        {/* Rating and Category */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-gray-600">4.9</span>
          </div>
          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-dark line-clamp-2 leading-snug min-h-[3rem]">
          {product.name}
        </h3>

        {/* Price & CTA */}
        <div className="flex flex-wrap justify-between items-center pt-2 gap-3">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.isOnSale && (
              <span className="text-xs text-gray-400 line-through">
                ${(product.price * 1.3).toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            className="whitespace-nowrap px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all duration-300 flex items-center gap-2 group/button"
            onClick={(e) => {
              e.preventDefault();
              addToCart(
                {
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                },
                
              );
              showCartToast(product.name, 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover/button:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="relative z-10">Add</span>
          </Button>
        </div>

        {/* Additional Features Icons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
            <span>Free shipping</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Delivery in 2 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
