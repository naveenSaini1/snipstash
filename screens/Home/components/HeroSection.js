"use client"
import React from "react"
import Link from "next/link"
import { ROUTE_REGISTER } from "@/constants/endpoints"

/**
 * Hero section for SnipStash landing page.
 */
function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] py-20 text-center bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 overflow-hidden">
      {/* Subtle code/gradient background */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-40" aria-hidden>
        <svg width="100%" height="100%" className="w-full h-full">
          <defs>
            <linearGradient id="lines" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {[...Array(20)].map((_, i) => (
            <line
              key={i}
              x1={i * 60}
              y1="0"
              x2={i * 60}
              y2="100%"
              stroke="url(#lines)"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>
      <h1 className="relative text-3xl md:text-5xl font-extrabold text-white mb-6 z-10">
        Organize, Search & Never Lose a Snippet Again.
      </h1>
      <p className="relative text-lg md:text-2xl text-gray-300 mb-10 z-10 max-w-2xl mx-auto">
        SnipStash helps developers stash, tag, and retrieve their best code — fast.
      </p>
      <div className="relative flex flex-col sm:flex-row gap-4 z-10">
        <Link href={ROUTE_REGISTER} className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded shadow transition-colors">
          Sign Up Free
        </Link>
        {/* <button className="border border-blue-500 text-blue-200 hover:bg-blue-900/30 text-lg font-semibold px-8 py-3 rounded shadow transition-colors">
          Try Demo
        </button> */}
      </div>
    </section>
  )
}

export default HeroSection 