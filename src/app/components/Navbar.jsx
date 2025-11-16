"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Bell } from "lucide-react";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = ["Top Stories", "World", "Politics", "Business", "Tech", "Culture"];

  return (
    <>
      <nav className="w-full bg-white dark:bg-gray-900 border-b shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-sm" />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">News Today</span>
          </Link>
 
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link}
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
              >
                {link}
              </Link>
            ))}
          </div>

        
          <div className="hidden md:flex items-center gap-5">
            <SearchBar className="w-64" />
            <ThemeToggle />
            <Bell size={20} className="cursor-pointer text-gray-700 dark:text-gray-300" />
          </div>
 
          <button className="md:hidden block text-gray-700 dark:text-gray-300" onClick={() => setMobileOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300 dark:border-gray-700">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">Menu</span>
          <button onClick={() => setMobileOpen(false)}>
            <X size={28} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <div className="flex flex-col mt-6 px-6 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link}
              href="/"
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 transition"
            >
              {link}
            </Link>
          ))}

          <div className="mt-4 flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <SearchBar className="w-full" onResultClick={() => setMobileOpen(false)} />
          </div>
        </div>
      </div>
    </>
  );
}
