"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { endpoints } from "../api/news";  

export default function SearchBar({ className = "", onResultClick }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (q) => {
    if (!q) return setResults([]);

    setLoading(true);
    try {
      const res = await axios.get(endpoints.search(q));
      setResults(res.data.articles || []);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => fetchResults(query), 500);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
        <Search size={18} className="text-gray-400 dark:text-gray-300" />
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none text-sm text-gray-900 dark:text-gray-200 w-full"
        />
      </div>

      {query && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 mt-1 max-h-60 overflow-y-auto z-50 rounded-md shadow-md">
          {loading && <p className="p-4 text-gray-700 dark:text-gray-300">Loading...</p>}
          {!loading && results.length === 0 && <p className="p-4 text-gray-700 dark:text-gray-300">No results found.</p>}
          {!loading && results.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onResultClick && onResultClick()}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-200"
            >
              {item.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
