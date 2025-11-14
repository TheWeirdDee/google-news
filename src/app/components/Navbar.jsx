"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Menu, X, Search, Bell } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import axios from "axios";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const navLinks = ["Top Stories", "World", "Politics", "Business", "Tech", "Culture"];

  const fetchSearchResults = async (query) => {
  if (!query) {
    setSearchResults([]);
    return;
  }

  setLoading(true);
  try {
    const res = await axios.get(endpoints.search(query));
    setSearchResults(res.data.articles || []);
  } catch (err) {
    console.error("Search error:", err);
    setSearchResults([]);
  } finally {
    setLoading(false);
  }
};


   
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSearchResults(searchQuery);
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

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
            {/* Small search bar */}
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
              <Search size={18} className="text-gray-400 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-900 dark:text-gray-200"
              />
            </div>

            
            <div className="hidden md:flex items-center gap-5">
  <SearchBar className="w-64" />
  <ThemeToggle />
  <Bell size={20} className="cursor-pointer text-gray-700 dark:text-gray-300" />
</div>


             
            <Bell size={20} className="cursor-pointer text-gray-700 dark:text-gray-300" />
          </div>

          <button
            className="md:hidden block text-gray-700 dark:text-gray-300"
            onClick={toggleMobile}
          >
            <Menu size={28} />
          </button>
        </div>

        
        {searchQuery && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 z-40 max-h-60 overflow-y-auto">
            {loading && <p className="p-4 text-gray-700 dark:text-gray-300">Loading...</p>}
            {!loading && searchResults.length === 0 && (
              <p className="p-4 text-gray-700 dark:text-gray-300">No results found.</p>
            )}
            {!loading &&
              searchResults.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-200"
                >
                  {item.title}
                </a>
              ))}
          </div>
        )}
      </nav>
 

      {/* Mobile menu */}
     <div className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-y-0" : "-translate-y-full"}`}>
  <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300 dark:border-gray-700">
    <span className="text-xl font-semibold text-gray-900 dark:text-white">Menu</span>
    <button onClick={toggleMobile}>
      <X size={28} className="text-gray-700 dark:text-gray-300" />
    </button>
  </div>

  <div className="flex flex-col mt-6 px-6 space-y-6">
    {navLinks.map((link) => (
      <Link
        key={link}
        href="/"
        onClick={toggleMobile}
        className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 transition"
      >
        {link}
      </Link>
    ))}
     

          {/* Mobile search */}
          <div className="mt-4 flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Search size={20} className="text-gray-400 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-gray-900 dark:text-gray-200"
            />
          </div>

          {/* Mobile search results */}
          {searchQuery && (
            <div className="flex flex-col mt-2 space-y-2 max-h-60 overflow-y-auto">
              {loading && <p className="px-4 py-2 text-gray-700 dark:text-gray-300">Loading...</p>}
              {!loading && searchResults.length === 0 && (
                <p className="px-4 py-2 text-gray-700 dark:text-gray-300">No results found.</p>
              )}
              {!loading &&
                searchResults.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={toggleMobile}
                    className="px-4 py-2 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  >
                    {item.title}
                  </a>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
