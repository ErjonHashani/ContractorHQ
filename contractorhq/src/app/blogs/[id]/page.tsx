import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiClock, FiUser } from "react-icons/fi";

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  image?: string;
  isPublished: boolean;
  publishedDate: string;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const blog: Blog = await res.json();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors group"
        >
          <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to all articles</span>
        </Link>
      </div>

      <article className="space-y-8">
        <header className="space-y-6">
          <div className="space-y-1">
            <span className="inline-block px-3 py-1 bg-primary-lighter text-primary-dark rounded-full text-sm font-medium mb-3">
              {blog.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-dark leading-tight">
              {blog.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray">
            <div className="flex items-center gap-2">
              <FiUser className="w-4 h-4 text-gray" />
              <span>By {blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="w-4 h-4 text-gray" />
              <span>
                {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {blog.image && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mt-6">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              />
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none text-dark">
          {blog.content.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="mb-6 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <footer className="pt-8 mt-8 border-t border-gray-light">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors group"
          >
            <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to all articles</span>
          </Link>
        </footer>
      </article>
    </div>
  );
}
