"use client";   

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <SearchBar  />
        <HeroSection />
      </div>
    </div>
  );
}
