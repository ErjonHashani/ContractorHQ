"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFetchProducts } from "@/app/hooks/useFetchProducts";
import { Button } from "@/components/ui/Button";
import { FiTool } from "react-icons/fi";
import toast from "react-hot-toast";

interface Product {
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

export default function AdminProductsPage() {
  const [newProduct, setNewProduct] = useState<Omit<Product, "_id">>({
    name: "",
    price: 0,
    category: "",
    brand: "",
    isOnSale: false,
    image: "",
    images: [],
    description: "",
  });

  const [newImageInput, setNewImageInput] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const { products, loading, error, refetch } = useFetchProducts();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      toast.success("Product deleted successfully!");
      refetch();
    }
  };

  const handleAddImage = () => {
    if (newImageInput.trim().startsWith("/images/products/")) {
      setNewProduct((prev) => ({
        ...prev,
        images: [...(prev.images || []), newImageInput.trim()],
      }));
      setNewImageInput("");
      toast.success("Image added!");
    } else {
      toast.error("Additional images must be relative to /images/products/");
    }
  };

  const handleRemoveImage = (index: number) => {
    setNewProduct((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newProduct.image.startsWith("/images/products/")) {
      toast.error("Please provide a valid main image URL starting with /images/products/");
      return;
    }

    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: { "Content-Type": "application/json" },
    });

    toast.success("Product created successfully!");
    setNewProduct({
      name: "",
      price: 0,
      category: "",
      brand: "",
      isOnSale: false,
      image: "",
      images: [],
      description: "",
    });

    refetch();
  };

  if (error) return <p className="p-8 text-error">Error: {error.message}</p>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-primary/10 rounded-full">
            <FiTool className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-dark">Product Management</h1>
        </div>
        <p className="text-gray-500 text-center max-w-lg">
          Create, edit, and manage your product content
        </p>
      </div>

      <Button
        onClick={() => setShowForm(!showForm)}
        variant="accent"
        className="mb-6"
      >
        {showForm ? "Hide Form" : "Add New Product"}
      </Button>

      {/* Product Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-light shadow-lg p-6 rounded-lg"
        >
          <h2 className="text-2xl font-semibold text-dark">Add New Product</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="input border border-gray-light rounded-md p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price === 0 ? "" : newProduct.price.toString()}
              onChange={(e) => {
                const value = e.target.value;
                setNewProduct({
                  ...newProduct,
                  price: value === "" ? 0 : parseFloat(value) || 0,
                });
              }}
              className="input border border-gray-light rounded-md p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="input border border-gray-light rounded-md p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="Brand"
              value={newProduct.brand}
              onChange={(e) =>
                setNewProduct({ ...newProduct, brand: e.target.value })
              }
              className="input border border-gray-light rounded-md p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Main Image URL (/images/products/...)"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            className="input border border-gray-light rounded-md p-2 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
            required
          />

          {/* Additional Images Input */}
          <div>
            <label className="block text-dark font-medium">
              Additional Images
            </label>
            <div className="flex gap-3 mt-2">
              <input
                type="text"
                placeholder="/images/products/extra1.png"
                value={newImageInput}
                onChange={(e) => setNewImageInput(e.target.value)}
                className="input border border-gray-light rounded-md p-2 focus:ring-2 focus:ring-primary focus:border-transparent flex-1"
              />
              <Button
                type="button"
                onClick={handleAddImage}
                variant="accent"
                size="sm"
              >
                Add Image
              </Button>
            </div>

            <ul className="mt-3 space-y-2">
              {(newProduct.images || []).map((img, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center text-dark bg-gray-light p-2 rounded"
                >
                  <span className="truncate text-sm">{img}</span>
                  <Button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    variant="ghost"
                    size="sm"
                    className="text-error hover:text-error"
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="input border border-gray-light rounded-md p-3 h-40 resize-none focus:ring-2 focus:ring-primary focus:border-transparent w-full"
            required
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newProduct.isOnSale}
              onChange={(e) =>
                setNewProduct({ ...newProduct, isOnSale: e.target.checked })
              }
              className="h-4 w-4 text-primary focus:ring-primary"
            />
            <span className="text-dark">On Sale</span>
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Add Product
          </Button>
        </form>
      )}

      {/* Product List */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-dark mb-4">Product List</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <p className="text-error">Error: {error}</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-light p-6 rounded-lg shadow-lg flex flex-col items-center border border-gray-light"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-32 h-32 object-cover mb-4 rounded-md"
                />
                <h3 className="font-semibold text-xl text-dark text-center">
                  {product.name}
                </h3>
                <p className="text-dark text-sm">${product.price.toFixed(2)}</p>
                <p className="text-gray text-xs">{product.category}</p>

                <div className="mt-4 flex gap-4">
                  <Link href={`/admin/products/${product._id}`}>
                    <span className="text-primary hover:bg-primary-lighter px-3 py-1.5 text-xs rounded-lg">
                      Edit
                    </span>
                  </Link>
                  <Button
                    onClick={() => handleDelete(product._id)}
                    variant="danger"
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
