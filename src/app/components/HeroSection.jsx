// src/app/components/HeroSection.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

const endpoints = {
  topHeadlines: `${BASE_URL}/top-headlines?country=ng&apiKey=${API_KEY}`,
  category: (cat) => `${BASE_URL}/top-headlines?country=ng&category=${cat}&apiKey=${API_KEY}`,
  search: (q) => `${BASE_URL}/everything?q=${encodeURIComponent(q)}&sortBy=publishedAt&apiKey=${API_KEY}`,
};

export default function HeroSection() {
  const categories = ["All", "Top Stories", "World", "Politics", "Business", "Tech"];
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  const fetchNews = async ({ cat = "All", q = "" } = {}) => {
    setError("");
    setLoading(true);

    try {
      let url;
      if (q && q.trim().length > 0) {
        url = endpoints.search(q.trim());
      } else {
        url = cat === "All" ? endpoints.topHeadlines : endpoints.category(cat.toLowerCase());
      }

      const res = await axios.get(url);
      if (res.status !== 200) throw new Error(`Unexpected status ${res.status}`);
      setData(res.data.articles || []);
    } catch (err) {
      console.error("fetchNews error:", err);
   
      if (err.response && err.response.status === 426) {
        setError("Server is asking for protocol upgrade (426). Use https or check your network.");
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to load news. Check your API key, rate limits or network.");
      }
      setData([]);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchNews({ cat: activeCat, q: "" });

  }, [activeCat]);

  
  useEffect(() => {
    const t = setTimeout(() => {
    
      if (!query.trim()) {
        fetchNews({ cat: activeCat, q: "" });
      } else {
        fetchNews({ q: query });
      }
    }, 500);
    return () => clearTimeout(t);
    
  }, [query]);

  const featured = data && data.length > 0 ? data[0] : null;
  const list = data && data.length > 1 ? data.slice(1) : [];

  return (
    <section className="w-full px-6 py-6 mt-20 max-w-6xl mx-auto">
      {/* top controls: categories + search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCat(cat);
                setQuery("");
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition
                ${activeCat === cat ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full md:w-96">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <circle cx="11" cy="11" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle>
            </svg>
            <input
              className="bg-transparent outline-none w-full text-sm text-gray-900 dark:text-gray-100"
              placeholder="Search news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
 
      {loading && (
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">Loading articles…</div>
      )}

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-800 rounded">
          {error}
        </div>
      )}
 
      {featured ? (
        <div className="relative w-full h-[360px] rounded-xl overflow-hidden shadow-md mb-8">
         
          <Image
            src={featured.urlToImage || "/placeholder.jpg"}
            alt={featured.title || "Featured image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-8 flex flex-col justify-end">
            <h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight max-w-3xl">
              {featured.title}
            </h1>

            {featured.description && (
              <p className="text-gray-200 mt-3 max-w-2xl text-sm md:text-base line-clamp-3">
                {featured.description}
              </p>
            )}

            <div className="mt-5 flex items-center gap-3">
              <Link
                href={featured.url}
                target="_blank"
                className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Read More
              </Link>

              {featured.source && featured.source.name && (
                <span className="text-sm text-gray-300">{featured.source.name}</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        !loading && !error && <div className="mb-8 text-gray-600 dark:text-gray-300">No featured article</div>
      )}

      {/* list of remaining articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.length === 0 && !loading && !error && (
          <div className="text-gray-600 dark:text-gray-300">No more articles</div>
        )}

        {list.map((article, idx) => (
          <article key={idx} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800">
            <div className="relative h-40 w-full">
              <Image
                src={article.urlToImage || "/placeholder.jpg"}
                alt={article.title || "img"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{article.description}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>{article.source?.name}</span>
                <a href={article.url} target="_blank" rel="noreferrer" className="text-blue-600">Read</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
