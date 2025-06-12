/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    isPublished: true,
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog by ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load blog");

        setBlog({
          title: data.title,
          content: data.content,
          category: data.category,
          image: data.image || "",
          isPublished: data.isPublished,
        });
      } catch (err: any) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, ariaChecked } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? ariaChecked : value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Update failed");

      toast.success("Blog updated successfully.");
      router.push("/admin/blogs");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/blogs");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">{error}</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 rounded-lg shadow-sm border bg-light border-gray-light">
      <h1 className="text-3xl font-bold text-dark mb-6">Edit Blog Post</h1>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-six mb-1">
            Title*
          </label>
          <input
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-light rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-six mb-1">
            Category*
          </label>
          <input
            name="category"
            value={blog.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-light rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-six mb-1">
            Content*
          </label>
          <textarea
            name="content"
            value={blog.content}
            onChange={handleChange}
            required
            rows={6}
            className="w-full p-3 border border-gray-light rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-six mb-1">
            Image URL
          </label>
          <input
            name="image"
            value={blog.image}
            onChange={handleChange}
            placeholder="/images/blogs/blog-1.jpg"
            className="w-full p-3 border border-gray-light rounded-lg"
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="isPublished"
            checked={blog.isPublished}
            onChange={handleChange}
            className="h-5 w-5 border-gray-300 rounded"
          />
          <label className="text-sm font-medium text-gray-six">
            Publish this post
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="danger"
            onClick={handleCancel}
            disabled={updating}
          >
            Cancel
          </Button>
          <Button type="submit" size="lg" loading={updating}>
            Update Blog
          </Button>
        </div>

        {error && <p className="text-error mt-4">{error}</p>}
      </form>
    </div>
  );
}
