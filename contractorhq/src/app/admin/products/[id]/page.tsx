"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  image: string;
  images?: string[];
  isOnSale: boolean;
}

const UpdateProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newImageInput, setNewImageInput] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddImage = () => {
    if (!product) return;

    if (newImageInput.trim().startsWith("/images/products/")) {
      setProduct({
        ...product,
        images: [...(product.images || []), newImageInput.trim()],
      });
      setNewImageInput("");
      toast.success("Image added!");
    } else {
      toast.error("Additional images must be relative to /images/products/");
    }
  };

  const handleRemoveImage = (index: number) => {
    if (!product) return;
    setProduct({
      ...product,
      images: (product.images || []).filter((_, i) => i !== index),
    });
    toast.success("Image removed");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update product");
      }

      toast.success("Product updated successfully!");
      router.push("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error instanceof Error ? error.message : "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-dark mb-4">
          Product not found
        </h2>
        <Button
          onClick={() => router.push("/admin/products")}
          variant="primary"
        >
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-dark">Update Product</h1>
        <Button
          variant="secondary"
          onClick={() => router.push("/admin/products")}
        >
          Back to Products
        </Button>
      </div>

      <form
        onSubmit={handleUpdate}
        className="bg-light p-8 rounded-xl shadow-sm border border-gray-light"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-7">
              Product Name *
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="w-full p-3 border border-gray-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-7">
              Price *
            </label>
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
              className="w-full p-3 border border-gray-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-7">
              Category *
            </label>
            <input
              type="text"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              className="w-full p-3 border border-gray-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-7">
              Brand *
            </label>
            <input
              type="text"
              value={product.brand}
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
              className="w-full p-3 border border-gray-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-7">
            Main Image URL
          </label>
          <input
            type="text"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            className="w-full p-3 border border-gray-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
            placeholder="/images/products/example.jpg"
          />
          {product.image && (
            <div className="mt-2">
              <div className="text-sm text-gray-500 mb-1">Image Preview:</div>
              <div className="relative h-48 w-full border border-gray-light rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  fill
                  alt="Preview"
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-7">
            Additional Images
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={newImageInput}
              onChange={(e) => setNewImageInput(e.target.value)}
              className="flex-1 p-3 border border-gray-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
              placeholder="/images/products/extra1.jpg"
            />
            <Button type="button" variant="accent" onClick={handleAddImage}>
              Add Image
            </Button>
          </div>

          {product.images && product.images.length > 0 && (
            <div className="mt-3 space-y-2">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm text-gray-7 truncate">{img}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="text-error hover:text-error-dark"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-7">
            Description *
          </label>
          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="w-full p-3 border border-gray-light rounded-lg h-40 focus:ring-2 focus:ring-primary focus:border-primary transition"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={product.isOnSale}
            onChange={(e) =>
              setProduct({ ...product, isOnSale: e.target.checked })
            }
            className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label className="text-sm font-medium text-gray-7">On Sale</label>
        </div>

        <div className="flex gap-4 justify-end pt-6">
          <Button
            type="button"
            variant="danger"
            onClick={() => router.push("/admin/products")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={isLoading}>
            Update Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductPage;
