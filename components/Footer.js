"use client"
import React from "react"

/**
 * Simple dark footer for SnipStash landing page.
 */
function Footer() {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800 py-6 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4 text-gray-400 text-sm">
        <div>© SnipStash 2025</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer 