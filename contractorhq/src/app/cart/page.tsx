"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cart";
import { FaPlus, FaMinus, FaTrash, FaShoppingCart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RiEmotionSadLine } from "react-icons/ri";
import { Button } from "@/components/ui/Button";
import { FiArrowRight, FiClock, FiLock, FiShoppingCart } from "react-icons/fi";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const handleCheckout = async () => {
    if (!session) {
      toast.error("You must be signed in to proceed to checkout.");
      return;
    }

    try {
      const response = await fetch("/api/user/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items,
          total: totalPrice(),
        }),
      });

      if (!response.ok) throw new Error("Failed to create order");

      const { order } = await response.json();
      useCartStore.getState().clearCart();
      toast.success(`Order #${order._id} placed successfully!`);
      router.push("/user/orders");
    } catch (error) {
      toast.error(
        `Failed to place order. Please try again later. ---> ${error}`
      );
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-light">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-gray-600 bg-light">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <HiOutlineShoppingBag className="text-4xl text-gray-400" />
        </div>
        <h1 className="text-2xl font-semibold mb-2 flex items-center gap-2">
          Your cart is empty <RiEmotionSadLine />
        </h1>
        <p className="text-gray-500">Add some products to your cart first.</p>
      </div>
    );
  }

  return (
    <div className="bg-light flex justify-center items-center py-12">
      <div className="px-4 py-10 min-h-screen max-w-4xl">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="bg-indigo-100 p-3 rounded-full">
            <FaShoppingCart className="text-indigo-600 text-xl" />
          </div>
          <h1 className="text-3xl font-bold text-dark">Shopping Cart</h1>
          <span className="sm:ml-auto bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="space-y-4">
          {items.map(({ _id, name, price, image, quantity }) => (
            <div
              key={_id}
              className="flex flex-col lg:flex-row items-center gap-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-gray-900 sm:truncate overflow-hidden">
                  {name}
                </h2>
                <p className="text-indigo-600 font-medium">
                  ${price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => updateQuantity(_id, quantity - 1)}
                  disabled={quantity <= 1}
                  aria-label={`Decrease quantity of ${name}`}
                  variant="cartIcon"
                >
                  <FaMinus size={14} />
                </Button>
                <span className="w-8 text-center font-medium text-gray-900">
                  {quantity}
                </span>
                <Button
                  onClick={() => updateQuantity(_id, quantity + 1)}
                  aria-label={`Increase quantity of ${name}`}
                  variant="cartIcon"
                >
                  <FaPlus size={14} />
                </Button>

                <Button
                  onClick={() => removeFromCart(_id)}
                  aria-label={`Remove ${name} from cart`}
                  variant="danger"
                >
                  <FaTrash size={18} />
                </Button>
              </div>
              <div className="ml-auto font-semibold text-lg text-gray-900 whitespace-nowrap">
                ${(price * quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Price info */}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-lg shadow-xs border border-indigo-100">
                <FiShoppingCart className="text-indigo-500 text-lg" />
              </div>
              <div className="text-right sm:text-left">
                <p className="text-gray-600 text-sm font-medium">Order Total</p>
                <p className="text-indigo-700 text-2xl font-bold">
                  ${totalPrice().toFixed(2)}
                </p>
                <p className="text-xs text-gray-400 mt-1">VAT included</p>
              </div>
            </div>

            <Button
              variant="cartIcon"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
              onClick={handleCheckout}
            >
              <span>Secure Checkout</span>
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Minimal trust indicators */}
          <div className="mt-4 pt-4 border-t border-indigo-100 flex justify-center gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FiLock className="text-green-500" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FiClock className="text-blue-500" />
              <span>Fast processing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
