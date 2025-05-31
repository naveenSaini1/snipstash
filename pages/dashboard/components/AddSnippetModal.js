"use client";
import React, { useState } from 'react';

/**
 * Modal component for creating a new snippet.
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function} props.onClose - Handler to close the modal.
 * @param {function} props.onCreate - Handler to create the snippet (receives snippet details).
 * @param {Array<Object>} props.folders - List of folders available for selection.
 */
function AddSnippetModal({ isOpen, onClose, onCreate, folders }) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(''); // Or set a default language
  const [manualTags, setManualTags] = useState(''); // Comma-separated string for now
  const [description, setDescription] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState(''); // State for selected folder

  if (!isOpen) return null;

  const handleCreateClick = () => {
    // Basic validation
    if (title.trim() && code.trim() && language.trim()) {
      onCreate({
        title: title.trim(),
        code: code.trim(),
        language: language.trim(),
        manualTags: manualTags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        description: description.trim(),
        folderId: selectedFolderId === '' ? null : parseInt(selectedFolderId, 10), // Pass selected folder ID
      });
      // Clear form after creating
      setTitle('');
      setCode('');
      setLanguage('');
      setManualTags('');
      setDescription('');
      setSelectedFolderId(''); // Clear selected folder
    } else {
      alert('Please fill in Title, Code, and Language.');
    }
  };

  const handleOverlayClick = (e) => {
    // Close modal if clicking outside the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Dummy languages - replace with a real list or API fetch later
  const languages = ['javascript', 'python', 'bash', 'html', 'css', 'json'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleOverlayClick}>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-4">Create New Snippet</h2>

        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="snippet-title" className="block text-sm font-medium text-gray-300">Snippet Title</label>
          <input
            type="text"
            id="snippet-title"
            className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="e.g., Fetch API Example"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Language Select */}
        <div className="mb-4">
          <label htmlFor="snippet-language" className="block text-sm font-medium text-gray-300">Language</label>
          <select
            id="snippet-language"
            className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">Select Language</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Folder Select */}
        <div className="mb-4">
          <label htmlFor="snippet-folder" className="block text-sm font-medium text-gray-300">Folder</label>
          <select
            id="snippet-folder"
            className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={selectedFolderId}
            onChange={(e) => setSelectedFolderId(e.target.value)}
          >
            <option value="">No Folder (All Snippets)</option>
            {folders.filter(folder => folder.id !== null).map(folder => ( // Exclude 'All My Snippets' default folder
              <option key={folder.id} value={folder.id}>{folder.name}</option>
            ))}
          </select>
        </div>

        {/* Code Input */}
        <div className="mb-4">
          <label htmlFor="snippet-code" className="block text-sm font-medium text-gray-300">Code Input</label>
          <textarea
            id="snippet-code"
            className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm"
            rows="10"
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
        </div>

        {/* Optional Fields */}
        <div className="mb-4">
           <label htmlFor="snippet-tags" className="block text-sm font-medium text-gray-300">Manual Tags (comma-separated)</label>
           <input
             type="text"
             id="snippet-tags"
             className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
             placeholder="e.g., react, hooks, state"
             value={manualTags}
             onChange={(e) => setManualTags(e.target.value)}
           />
        </div>

         <div className="mb-6">
           <label htmlFor="snippet-description" className="block text-sm font-medium text-gray-300">Description (Optional)</label>
           <textarea
             id="snippet-description"
             className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm"
             rows="3"
             placeholder="Add a brief description..."
             value={description}
             onChange={(e) => setDescription(e.target.value)}
           ></textarea>
         </div>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            onClick={handleCreateClick}
          >
            Create Snippet
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSnippetModal; 