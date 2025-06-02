"use client";
import React, { useState, useEffect } from 'react';

/**
 * Modal component for creating a new snippet.
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function} props.onClose - Handler to close the modal.
 * @param {function} props.onCreate - Handler to create the snippet (receives snippet details).
 * @param {Array<Object>} props.folders - List of folders available for selection.
 * @param {Object} [props.editingSnippet] - The snippet object being edited (optional).
 * @param {function} [props.onUpdate] - Handler to update the snippet (receives snippet ID and updated details) (optional).
 */
function AddSnippetModal({ isOpen, onClose, onCreate, folders, editingSnippet, onUpdate }) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(''); // Or set a default language
  const [manualTags, setManualTags] = useState(''); // Comma-separated string for now
  const [description, setDescription] = useState('');
  const [selectedFolderIds, setSelectedFolderIds] = useState([]); // State for selected folders

  // Effect to populate form when editingSnippet changes
  useEffect(() => {
    console.log('editingSnippet', editingSnippet);
    if (editingSnippet) {
      setTitle(editingSnippet.title || '');
      setCode(editingSnippet.code || '');
      setLanguage(editingSnippet.language || '');
      setManualTags(editingSnippet.tags ? editingSnippet.tags.join(', ') : ''); // Convert tags array to comma-separated string
      setDescription(editingSnippet.description || '');
      // Assuming snippet.folderId is a comma-separated string of folder IDs
      setSelectedFolderIds(editingSnippet.folderId && typeof editingSnippet.folderId === 'string' && editingSnippet.folderId.trim() !== ''
        ? editingSnippet.folderId.trim().split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id))
        : []
      );
    } else {
      // Reset form when modal is opened for creation
      setTitle('');
      setCode('');
      setLanguage('');
      setManualTags('');
      setDescription('');
      setSelectedFolderIds([]);
    }
  }, [editingSnippet]); // Re-run effect when editingSnippet changes

  if (!isOpen) return null;

  // Determine if we are in edit mode
  const isEditing = !!editingSnippet;

  const handleSaveClick = () => { // Renamed from handleCreateClick to handleSaveClick
    // Basic validation
    if (title.trim() && code.trim() && language.trim()) {
      const snippetData = {
        title: title.trim(),
        code: code.trim(),
        language: language.trim(),
        manualTags: manualTags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        description: description.trim(),
        folderId: selectedFolderIds.join(','), // Pass selected folder IDs as a comma-separated string
      };

      if (isEditing && onUpdate) {
        // Call onUpdate if in edit mode
        onUpdate(editingSnippet.id, snippetData);
      } else if (onCreate) {
        // Call onCreate if in create mode
        onCreate(snippetData);
      }

      // Clear form after saving (both create and update)
      setTitle('');
      setCode('');
      setLanguage('');
      setManualTags('');
      setDescription('');
      setSelectedFolderIds([]);
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

  // Handler for checkbox change
  const handleFolderChange = (folderId) => {
    setSelectedFolderIds(prevSelected =>
      prevSelected.includes(folderId)
        ? prevSelected.filter(id => id !== folderId)
        : [...prevSelected, folderId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleOverlayClick}>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-4">{isEditing ? 'Edit Snippet' : 'Create New Snippet'}</h2>

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
          <label htmlFor="snippet-folder" className="block text-sm font-medium text-gray-300">Folders</label>
          <div className="mt-1 bg-gray-700 border border-gray-600 rounded-md p-3 max-h-40 overflow-y-auto">
            {folders.filter(folder => folder.id !== null).map(folder => (
              <div key={folder.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`folder-${folder.id}`}
                  value={folder.id}
                  checked={selectedFolderIds.includes(folder.id)}
                  onChange={() => handleFolderChange(folder.id)}
                  className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                />
                <label htmlFor={`folder-${folder.id}`} className="ml-2 text-gray-300 text-sm">{folder.name}</label>
              </div>
            ))}
             {folders.filter(folder => folder.id === null).map(folder => ( // Optionally show the "All My Snippets" as unchecked
              <div key={folder.id} className="flex items-center opacity-50 cursor-not-allowed">
                 <input
                   type="checkbox"
                   id={`folder-${folder.id}`}
                   value={folder.id || ''}
                   checked={false}
                   disabled={true}
                   className="form-checkbox h-4 w-4 text-gray-500 transition duration-150 ease-in-out"
                 />
                 <label htmlFor={`folder-${folder.id}`} className="ml-2 text-gray-300 text-sm">{folder.name}</label>
              </div>
             ))}
          </div>
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
            onClick={handleSaveClick} // Use handleSaveClick
          >
            {isEditing ? 'Update Snippet' : 'Create Snippet'} {/* Change button text based on mode */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSnippetModal; 