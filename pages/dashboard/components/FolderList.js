"use client"
import React, { useState } from 'react'
import { Folder, Pin, Trash2, ChevronDown, ChevronRight } from 'lucide-react'

/**
 * Component to display a list of user folders.
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.folders - An array of folder objects with id, name, and snippetCount.
 * @param {Array<Object>} props.folders.snippets - An array of snippet objects within the folder (id, title).
 * @param {function} props.onSelectFolder - Handler for when a folder is clicked.
 * @param {Object|null} props.selectedFolder - The currently selected folder.
 * @param {function} props.onPinFolder - Handler for when a folder pin button is clicked.
 * @param {function} props.onDeleteFolder - Handler for when a folder delete button is clicked.
 */
function FolderList({ folders, onSelectFolder, selectedFolder, onPinFolder, onDeleteFolder }) {
  // Placeholder data for now


  const foldersToDisplay = folders || []; // Use prop or dummy data

  const [expandedFolderId, setExpandedFolderId] = useState(null);

  const handleToggleExpand = (folderId) => {
    setExpandedFolderId(expandedFolderId === folderId ? null : folderId);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-white mb-4">Your Folders</h2>
      <div className="flex flex-col gap-3">
        {foldersToDisplay.map((folder) => (
          <div key={folder.id} className="flex flex-col bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-sm overflow-hidden transition-all duration-300 ease-in-out">
            {/* Folder Header */}
            <div
              className={`flex items-center justify-between cursor-pointer py-1 ${
                selectedFolder?.id === folder.id
                  ? 'text-blue-400'
                  : 'text-gray-200 hover:text-white'
              }`}
              onClick={() => {
                onSelectFolder(folder);
                handleToggleExpand(folder.id);
              }}
            >
              <div className="flex items-center gap-3 font-medium">
                {expandedFolderId === folder.id ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <Folder className="w-5 h-5 text-blue-400" />
                <span>{folder.name}</span>
              </div>

              {/* Action buttons for non-default folders */}
              {!folder.isDefault && ( folder.id !== null) && (
                <div className="flex items-center gap-3 text-gray-400" onClick={(e) => e.stopPropagation()}> {/* Stop propagation for folder select */}
                  <span className="text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded-full">
                    {folder.snippetCount || 0}
                  </span>
                  {onPinFolder && (
                    <button
                      className="p-1 hover:text-blue-400 transition-colors duration-200"
                      onClick={() => onPinFolder(folder.id)}
                      aria-label="Pin folder"
                    >
                      <Pin className="w-4 h-4" />
                    </button>
                  )}
                  {onDeleteFolder && (
                     <button
                       className="p-1 hover:text-red-400 transition-colors duration-200"
                       onClick={() => onDeleteFolder(folder.id)}
                       aria-label="Delete folder"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   )}
                </div>
              )}
            </div>

            {/* Expanded Snippet List Container for Animation */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedFolderId === folder.id ? 'max-h-screen opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
              }`}
            >
              {/* Expanded Snippet List */}
              {folder.snippets && folder.snippets.length > 0 && (
                <div className="pl-6 border-l border-gray-700 flex flex-col gap-2 text-sm text-gray-400">
                  {folder.snippets.map(snippet => (
                    <div key={snippet.id} className="hover:text-white cursor-pointer transition-colors duration-200">
                      {snippet.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default FolderList 