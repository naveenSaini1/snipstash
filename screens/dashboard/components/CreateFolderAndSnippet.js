"use client"
import React from 'react'
import { FolderPlus, CodeXml } from 'lucide-react'

/**
 * Redesigned component for creating a new folder or snippet.
 * @param {Object} props - The component props.
 * @param {function} props.onCreateFolderClick - Handler for when the 'Create New Folder' button is clicked.
 * @param {function} props.onCreateSnippetClick - Handler for when the 'Create New Snippet' button is clicked.
 */
function CreateFolderAndSnippet({ onCreateFolderClick, onCreateSnippetClick }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-6 bg-[#1a1a1a] border border-[#282828] rounded-xl shadow-lg">
      <button 
        className="group flex-1 w-full flex items-center justify-center gap-3 py-4 border border-neutral-600 bg-neutral-800 rounded-lg text-neutral-200 hover:border-blue-500 hover:bg-blue-900 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
        onClick={onCreateFolderClick}
      >
        <FolderPlus className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
        <span className="text-base font-medium">New Folder</span>
      </button>

      <button className="group flex-1 w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
        onClick={onCreateSnippetClick}
      >
        <CodeXml className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
        <span className="text-base font-medium">New Snippet</span>
      </button>
    </div>
  )
}

export default CreateFolderAndSnippet
