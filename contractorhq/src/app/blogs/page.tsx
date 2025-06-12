// app/blogs/page.tsx
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { FiClock, FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs`, {
    // ISR: Revalidate every 60 seconds
    next: { revalidate: 60 },
    cache: "force-cache",
  });

  if (!res.ok) {
    console.error("Failed to fetch blogs");
    return [];
  }

  return res.json();
}

export default async function BlogListPage() {
  const blogs = await getBlogs();

  return (
    <section className="bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent mb-4">
            Latest Insights
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Discover our collection of professional articles and industry
            perspectives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
            >
              {blog.image && (
                <div className="relative h-60 w-full group overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FiClock className="mr-1" />
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {blog.content}
                </p>
                <Button
                  variant="ghost"
                  className="group flex items-center text-indigo-600 hover:text-indigo-700 px-0"
                >
                  <Link href={`/blogs/${blog._id}`} className="flex items-center space-x-1">
                    Read more
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
}
