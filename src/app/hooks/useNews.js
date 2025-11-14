"use client";
import { useState, useEffect } from "react";

export default function useNews(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    async function fetchNews() {
      try {
        setLoading(true);

        const response = await fetch(url);
        const json = await response.json();

        if (json.status === "ok") {
          setData(json.articles);
        } else {
          setError("Failed to load news");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [url]); 

  return { data, loading, error };
}
