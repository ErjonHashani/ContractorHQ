"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  FaUserCog,
  FaUser,
  FaShoppingBag,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Button } from "../ui/Button";
import { FiLogIn } from "react-icons/fi";

// Helper function to generate a random color for user profile icon
const getRandomColor = (name: string) => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-red-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-indigo-500",
  ];
  const charCode = name.charCodeAt(0) || 0;
  return colors[charCode % colors.length];
};

// Helper function to get first letter that is an alphabet (A-Z)
const getFirstLetter = (name: string) => {
  const match = name.match(/[a-zA-Z]/);
  return match ? match[0].toUpperCase() : "U";
};

export default function AuthButtons() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/auth/login">
          <div className="relative inline-block m-1 cursor-pointer overflow-hidden rounded-md border-2 border-primary-light bg-primary-light px-3.5 py-2 font-medium text-white group">
            <span className="absolute top-1/2 left-0 h-64 w-64 -translate-x-20 -translate-y-32 rotate-45 transform bg-white transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100" />

            <span className="relative z-10 transition duration-300 ease-in-out group-hover:text-primary-light flex items-center space-x-1">
              <FiLogIn />
              <span>Sign in</span>
            </span>
          </div>
        </Link>
      </div>
    );
  }

  const isAdmin = session.user?.role === "admin";
  const firstLetter = getFirstLetter(session.user?.name || "User");
  const bgColor = getRandomColor(session.user?.name || "User");

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center gap-2"
        variant="user"
        size="xs"
      >
        <div
          className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center text-white font-medium`}
        >
          {firstLetter}
        </div>
      </Button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-light rounded-xl shadow-lg z-50 overflow-hidden border-1 border-gray-light">
          <div className="p-4 border-b border-gray-light flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center text-white font-medium text-lg`}
            >
              {firstLetter}
            </div>
            <div>
              <p className="text-sm font-medium text-dark truncate">
                {session.user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session.user?.email}
              </p>
            </div>
          </div>

          <div>
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center px-4 py-2.5 text-sm text-gray-7 hover:bg-admin-auth hover:text-blue-600 transition-colors duration-150 border-b-1 border-gray-light"
              >
                <FaUserCog className="mr-2 text-blue-500" />
                Admin Dashboard
              </Link>
            )}
            <Link
              href="/user/profile"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center px-4 py-2.5 text-sm text-gray-7 hover:bg-gray-hundred transition-colors duration-150"
            >
              <FaUser className="mr-2 text-gray-500" />
              Profile
            </Link>
            <Link
              href="/user/orders"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center px-4 py-2.5 text-sm text-gray-7 hover:bg-gray-hundred transition-colors duration-150"
            >
              <FaShoppingBag className="mr-2 text-gray-500" />
              Orders
            </Link>
            <Link
              href="/user/settings"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center px-4 py-2.5 text-sm text-gray-7 hover:bg-gray-hundred transition-colors duration-150"
            >
              <FaCog className="mr-2 text-gray-500" />
              Settings
            </Link>
            <button
              onClick={() => {
                setDropdownOpen(false);
                handleSignOut();
              }}
              className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 border-t-1 border-gray-light"
            >
              <FaSignOutAlt className="mr-2" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
