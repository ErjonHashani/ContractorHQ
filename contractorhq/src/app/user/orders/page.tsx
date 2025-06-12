"use client";

import { useSession } from "next-auth/react";
import { FiPackage, FiTruck, FiCheckCircle } from "react-icons/fi";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Order {
  _id: string;
  items: {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[];
  total: number;
  status: "processing" | "shipped" | "delivered";
  createdAt: string;
}

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/user/orders");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-gray-600 bg-light">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <FiPackage className="text-4xl text-gray-400" />
        </div>
        <h1 className="text-2xl font-semibold mb-2">
          Sign in to view your orders
        </h1>
        <p className="text-gray-500">
          You must be signed in to view your order history.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-light">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-gray-600 bg-light">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <FiPackage className="text-4xl text-gray-400" />
        </div>
        <h1 className="text-2xl font-semibold mb-2">No orders yet</h1>
        <p className="text-gray-500">Your completed orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-light py-12 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-dark mb-8">Your Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order #{order._id.substring(0, 8)}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {format(
                      new Date(order.createdAt),
                      "MMMM d, yyyy 'at' h:mm a"
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {order.status === "processing" && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-1">
                      <FiPackage /> Processing
                    </span>
                  )}
                  {order.status === "shipped" && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1">
                      <FiTruck /> Shipped
                    </span>
                  )}
                  {order.status === "delivered" && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-1">
                      <FiCheckCircle /> Delivered
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-five pt-4 mt-4">
                {order.items.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 py-3">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-five pt-4 mt-4 flex justify-between items-center">
                <p className="text-gray-600">Total</p>
                <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
