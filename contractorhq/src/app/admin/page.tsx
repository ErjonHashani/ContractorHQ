// app/admin/page.tsx
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="bg-light p-8 rounded-xl shadow-lg border border-light max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-text-primary mb-4">
        Welcome to the Admin Dashboard
      </h1>
      <p className="text-text-secondary mb-8">
        Select a section from the sidebar to manage content.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Actions Card */}
        <div className="bg-primary-lighter/10 p-6 rounded-lg border border-primary-lighter dark:border-primary-dark/20 dark:bg-primary-dark/10">
          <h2 className="font-semibold text-primary-dark dark:text-primary-light mb-5">
            Quick Actions
          </h2>
          <div className="space-y-3 flex flex-col text-sm">
            <Link
              href="/admin/products"
              className="text-primary-dark dark:text-primary-light hover:bg-primary-lighter dark:hover:bg-primary-dark/20 ml-4 py-1 px-3 max-w-36 rounded-2xl transition-colors"
            >
              Add New Product
            </Link>
            <Link
              href="/admin/blogs"
              className="text-primary-dark dark:text-primary-light hover:bg-primary-lighter dark:hover:bg-primary-dark/20 ml-4 py-1 px-3 max-w-36 rounded-2xl transition-colors"
            >
              Create Blog Post
            </Link>
            <Link
              href="/admin/messages"
              className="text-primary-dark dark:text-primary-light hover:bg-primary-lighter dark:hover:bg-primary-dark/20 ml-4 py-1 px-3 max-w-36 rounded-2xl transition-colors"
            >
              View Customer Messages
            </Link>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-gray-50 dark:bg-gray-50/10 p-6 rounded-lg border border-gray-five">
          <h2 className="text-text-primary mb-2">Recent Activity</h2>
          <p className="text-text-secondary text-sm">No recent activity</p>
        </div>
      </div>
    </div>
  );
}
