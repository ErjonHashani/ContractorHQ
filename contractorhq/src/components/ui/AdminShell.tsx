"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiShoppingBag,
  FiMessageSquare,
} from "react-icons/fi";
import { FaPen } from "react-icons/fa";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  const NavItem = ({
    href,
    label,
    icon,
    exact = false,
  }: {
    href: string;
    label: string;
    icon: React.ReactNode;
    exact?: boolean;
  }) => {
    const isActive = exact
      ? pathname === href || pathname === href + "/"
      : pathname.startsWith(href);

    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
          isActive
            ? "bg-primary-dark text-light"
            : "hover:bg-primary/10 text-gray-7"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen md:flex bg-theme-white">
      <div className="md:hidden flex items-center justify-between bg-primary text-white px-4 py-3">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <button
          className="text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      <aside
        className={`${
          mobileOpen ? "block min-w-screen" : "hidden"
        } md:block w-64 bg-light shadow-lg p-6 space-y-8 md:sticky md:top-0 h-screen absolute overflow-y-auto z-10`}
      >
        <div className="flex items-center gap-3 border-b border-gray-five pb-4">
          <h2 className="text-xl font-bold text-dark">Admin Panel</h2>
        </div>
        <nav className="space-y-1">
          <NavItem
            href="/admin"
            label="Dashboard"
            icon={<FiHome />}
            exact={true}
          />
          <NavItem
            href="/admin/products"
            label="Products"
            icon={<FiShoppingBag className="text-blue-500" />}
          />
          <NavItem
            href="/admin/blogs"
            label="Blogs"
            icon={<FaPen className="text-green-500" />}
          />
          <NavItem
            href="/admin/messages"
            label="Messages"
            icon={<FiMessageSquare className="text-purple-500" />}
          />
        </nav>
      </aside>

      <main
        className={`flex-1 md:p-8 overflow-y-auto bg-gray-50 ${
          mobileOpen ? "overflow-hidden h-screen" : ""
        }`}
      >
        {children}
      </main>
    </div>
  );
}
