"use client";

import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserProfileClientProps {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export default function UserProfileClient({ user }: UserProfileClientProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <main className="bg-light py-12">
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl shadow-sm border-gray-light">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-primary-light">Profile Overview</h1>
        </div>

        <section className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-7 mb-4 pb-2 border-b border-gray-200">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="text-gray-7">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Email Address
                </p>
                <p className="text-gray-7">{user.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-gray-7 capitalize">
                  {user.role.toLowerCase()}
                </p>
              </div>
              {user.createdAt && (
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Member Since
                  </p>
                  <p className="text-gray-7">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-7 mb-4 pb-2 border-b border-gray-200">
            Account Actions
          </h2>
          <div className="space-y-3">
            <a
              href="/user/orders"
              className="block px-4 py-3 bg-white hover:bg-gray-100 rounded-md transition-colors duration-200 border border-gray-200 text-gray-700 font-medium"
            >
              View Order History
            </a>
            <a
              href="/user/settings"
              className="block px-4 py-3 bg-white hover:bg-gray-100 rounded-md transition-colors duration-200 border border-gray-200 text-gray-700 font-medium"
            >
              Update Account Settings
            </a>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-md transition-colors duration-200 border border-red-200"
            >
              <FaSignOutAlt className="mr-2" />
              Sign Out
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
