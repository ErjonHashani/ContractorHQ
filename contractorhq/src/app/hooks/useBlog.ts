/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useBlog.ts
import { useState } from "react";

export const useBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a new blog
  const createBlog = async (blogData: any) => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
      return await res.json();
    } catch (err: any) {
      setError(err.message || "Failed to create blog");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a blog
  const deleteBlog = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE",
      });
      return await res.json();
    } catch (err: any) {
      setError(err.message || "Failed to delete blog");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createBlog, deleteBlog, loading, error };
};
