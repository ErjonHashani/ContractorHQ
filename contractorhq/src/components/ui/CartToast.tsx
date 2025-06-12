// components/ui/CartToast.tsx
import React from "react";
import { BsCart3 } from "react-icons/bs";
import toast from "react-hot-toast";
import { Button } from "./Button";

interface CartToastProps {
  productName: string;
  quantity: number;
  toastId: string | number;
}

export function CartToast({ productName, quantity, toastId }: CartToastProps) {
  return (
    <div
      className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5"
      role="alert"
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5 text-green-600">
            <BsCart3 className="h-6 w-6" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">Added to cart</p>
            <p className="mt-1 text-sm text-gray-500">
              {quantity} × &quot;{productName}&quot;
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <Button
          onClick={() => toast.dismiss(String(toastId))}
          className="w-full rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary hover:bg-gray-100 border border-transparent"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
