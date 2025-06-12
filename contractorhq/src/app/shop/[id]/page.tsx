"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCartStore } from "@/lib/store/cart";
import toast from "react-hot-toast";
import { CartToast } from "@/components/ui/CartToast";
import Image from "next/image";
import { FaArrowUpRightDots, FaCheck, FaMinus, FaPlus } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  isOnSale: boolean;
  brand: string;
  category: string;
  description: string;
  rating?: number;
  reviews?: number;
  stock?: number;
}

async function getProduct(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/products/${id}`);

    if (!res.ok) {
      throw new Error("Product not found");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default function ProductPageWrapper() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [showThumbnails] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      const data = await getProduct(id);
      setProduct(data);
      if (data) {
        setMainImage(data.image);
      }
      setIsLoading(false);
    }
    fetchProduct();
  }, [id]);

  const showCartToast = (productName: string, quantity: number) => {
    toast.custom((t) => (
      <CartToast productName={productName} quantity={quantity} toastId={t.id} />
    ));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-light">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500 min-h-screen bg-light">
        <p className="mb-4">Product not found.</p>
        <button
          onClick={() => router.back()}
          className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const images = [product.image, ...(product.images || [])];

  return (
    <section className="bg-light">
      <div className="container mx-auto px-4 sm:px-8 py-8 min-h-screen">
        {/* Premium Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link
            href="/"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <FiHome />
            Home
          </Link>
          <span className="mx-2 text-gray-300">/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-primary font-medium">{product.category}</span>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-gray-600 truncate max-w-[120px] md:max-w-[200px]">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery Section */}
          <div className="flex flex-col-reverse sm:flex-row gap-6">
            {/* Thumbnail Navigation */}
            <div
              className={`${
                showThumbnails ? "flex" : "hidden"
              } flex-row sm:flex-col gap-4
              overflow-x-auto overflow-y-hidden
              sm:overflow-x-hidden sm:overflow-y-auto
              sm:max-h-[500px]`}
            >
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                    img === mainImage
                      ? "border-primary scale-105 shadow-md"
                      : "border-transparent hover:border-gray-200"
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>

            {/* Main Image with Zoom Preview */}
            <div className="relative w-full aspect-square sm:h-[500px] bg-gray-100 rounded-xl overflow-hidden group">
              {mainImage && (
                <>
                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </>
              )}

              {/* Floating Badges */}
              {product.isOnSale && (
                <div className="absolute top-4 left-4 bg-error text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 z-10">
                  <FaArrowUpRightDots />
                  <span>30% OFF</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              <span className="text-sm font-medium text-primary">
                {product.brand}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-7 mt-1">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < (product.rating || 4.5)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300 fill-current"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating || 4.5} ({product.reviews || 124} reviews)
                </span>
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <FaCheck />
                  In Stock
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline gap-4">
              <span
                className={`text-3xl font-bold ${
                  product.isOnSale ? "text-red-500" : "text-gray-900"
                }`}
              >
                ${product.price.toFixed(2)}
              </span>
              {product.isOnSale && (
                <span className="text-lg text-gray-500 line-through">
                  ${(product.price * 1.3).toFixed(2)}
                </span>
              )}
              {product.isOnSale && (
                <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                  Save{" "}
                  {(
                    ((0.3 * product.price * 1.3) / (product.price * 1.3)) *
                    100
                  ).toFixed(0)}
                  %
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-7">Quantity</h3>
              <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                <Button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="transition-colors"
                  variant="ghost"
                >
                  <FaMinus />
                </Button>
                <span className="px-4 text-lg font-medium">{quantity}</span>
                <Button
                  onClick={() => setQuantity(quantity + 1)}
                  className="transition-colors"
                  variant="ghost"
                >
                  <FaPlus />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(
                    {
                      _id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    },
                    quantity
                  );
                  showCartToast(product.name, quantity);
                }}
              >
                <BsCart3 />
                Add to Cart
              </Button>
              <button className="flex-1 border border-primary text-primary hover:bg-primary/5 py-3 px-6 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2">
                <HiOutlineShoppingBag />
                Buy Now
              </button>
            </div>

            {/* Product Details Accordion */}
            <div className="border-t border-gray-200 pt-6">
              <div className="space-y-4">
                <div>
                  <h3
                    className="text-lg font-semibold text-dark flex items-center justify-between cursor-pointer"
                    onClick={() => setShowDescription(!showDescription)}
                  >
                    <span>Description</span>
                    <IoIosArrowDown
                      className={`transform transition-transform duration-300 ${
                        showDescription ? "rotate-180" : ""
                      }`}
                    />
                  </h3>

                  {showDescription && (
                    <p className="ml-6 mt-2 text-gray-7">
                      {product.description}
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h3
                    className="text-lg font-semibold text-dark flex items-center justify-between cursor-pointer"
                    onClick={() => setShowFeatures(!showFeatures)}
                  >
                    <span>Features</span>
                    <IoIosArrowDown
                      className={`transform transition-transform duration-300 ${
                        showFeatures ? "rotate-180" : ""
                      }`}
                    />
                  </h3>

                  {showFeatures && (
                    <ul className="mt-2 space-y-2 text-gray-7">
                      <li className="flex items-center gap-2">
                        <FaCheck className="text-green-500" />
                        Premium quality materials
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheck className="text-green-500" />
                        Free worldwide shipping
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheck className="text-green-500" />
                        2-year warranty included
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
