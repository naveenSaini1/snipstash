"use client"
import React, { useState } from 'react';

/**
 * Modal component for creating a new folder.
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function} props.onClose - Handler to close the modal.
 * @param {function} props.onCreate - Handler to create the folder (receives folder name).
 */
function AddFolderModal({ isOpen, onClose, onCreate }) {
  const [folderName, setFolderName] = useState('');

  if (!isOpen) return null;

  const handleCreateClick = () => {
    if (folderName.trim()) {
      onCreate(folderName.trim());
      setFolderName(''); // Clear input after creating
    }
  };

  const handleOverlayClick = (e) => {
    // Close modal if clicking outside the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleOverlayClick}>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-xl font-bold text-white mb-4">Create New Folder</h2>
        <input
          type="text"
          className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter') handleCreateClick(); }}
        />
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
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddFolderModal 