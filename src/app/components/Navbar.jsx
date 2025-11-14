"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Bell } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const navLinks = [
    "Top Stories",
    "World",
    "Politics",
    "Business",
    "Tech",
    "Culture",
  ];

  return (
    <>
       
      <nav className="w-full bg-white border-b shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-sm" />
            <span className="text-xl font-semibold">News Today</span>
          </Link>

         
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link}
                href="/"
                className="text-gray-700 hover:text-black transition"
              >
                {link}
              </Link>
            ))}
          </div>
 
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm"
              />
            </div>

            <Bell size={20} className="cursor-pointer text-gray-700" />
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden block text-gray-700"
            onClick={toggleMobile}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

     
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="text-xl font-semibold">Menu</span>
 
          <button onClick={toggleMobile}>
            <X size={28} className="text-gray-700" />
          </button>
        </div>
 
        <div className="flex flex-col mt-6 px-6 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link}
              href="/"
              onClick={toggleMobile}
              className="text-lg font-medium text-gray-800 hover:text-blue-600 transition"
            >
              {link}
            </Link>
          ))}

           
          <div className="mt-4 flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
