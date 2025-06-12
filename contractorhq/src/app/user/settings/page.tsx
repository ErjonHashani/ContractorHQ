"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";

export default function UserSettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [originalName, setOriginalName] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
      setOriginalName(session.user.name);
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [status, session, router]);

  useEffect(() => {
    setIsModified(name.trim() !== originalName.trim());
  }, [name, originalName]);

  const saveChanges = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/user/update-name", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        toast.success("Changes saved. Please sign in again.");
        await signOut({ redirect: false });
        router.push("/auth/login");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to save changes");
      }
    } catch (err) {
      toast.error(`Something went wrong ---> ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteAccount = async () => {
    const res = await fetch("/api/user/delete", { method: "DELETE" });
    if (res.ok) {
      toast.success("Account deleted");
      signOut();
    } else {
      toast.error("Something went wrong");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <main className="bg-light py-12">
      <div className="max-w-2xl mx-auto p-6 bg-gray-50 border-1 border-gray-light rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-7">Account Settings</h1>
        </div>

        <section className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-7 mb-4 pb-2 border-b border-gray-200">
            Profile Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 border border-gray-light rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex justify-end">
            <Button
              onClick={saveChanges}
              loading={isLoading}
              disabled={!isModified || isLoading}
              variant="primary"
              size="md"
            >
              Save Changes
            </Button>
          </div>
        </section>

        <section className="bg-red-50/60 p-6 rounded-lg border border-red-100">
          <h2 className="text-lg font-semibold text-red-700 mb-3">
            Danger Zone
          </h2>
          <p className="text-sm text-red-600 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button
            onClick={() => setShowConfirmDelete(true)}
            className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-150"
          >
            Delete My Account
          </button>
        </section>
        {showConfirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-light bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
              <h3 className="text-lg font-semibold text-red-700 mb-4">
                Confirm Account Deletion
              </h3>
              <p className="mb-6 text-gray-700">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-4 py-2 text-gray-800 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    confirmDeleteAccount();
                    setShowConfirmDelete(false);
                  }}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
