"use client"
import React, { useState } from 'react'
import { Search } from 'lucide-react'

/**
 * Search input component for filtering snippets.
 * @param {Object} props - The component props.
 * @param {string} props.searchTerm - The current search term.
 * @param {function} props.onSearchChange - Handler for when the search term changes.
 */
function SearchInput({ searchTerm, onSearchChange }) {
  return (
    <div className="mt-6 mb-4 relative">
      <input
        type="text"
        placeholder="Search snippets by keyword, tag, or language..."
        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
    </div>
  )
}

export default SearchInput 