"use client"
import React, { useState } from 'react'
import { Copy, Tag, CalendarDays, Clock, Trash2, ChevronDown, ChevronUp, Pencil } from 'lucide-react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useDashboardContext } from '@/contextApi/DashboardContext';

// Import and register languages from constants
import { registerSyntaxHighlighterLanguages } from '@/constants/syntaxLanguages';

// Register languages with the highlighter
// Moved to constants/syntaxLanguages.js
// SyntaxHighlighter.registerLanguage('javascript', javascript);
// SyntaxHighlighter.registerLanguage('css', css);
// SyntaxHighlighter.registerLanguage('python', python);

registerSyntaxHighlighterLanguages(SyntaxHighlighter);

// Define a set of colors for tags (example using Tailwind classes)
const tagColors = [
  'bg-blue-700 text-blue-100',
  'bg-green-700 text-green-100',
  'bg-purple-700 text-purple-100',
  'bg-yellow-700 text-yellow-100',
  'bg-pink-700 text-pink-100',
];

/**
 * Component to display a list of snippets.
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.snippets - An array of snippet objects.
 * @param {number} props.snippets.id - The snippet ID.
 * @param {string} props.snippets.title - The snippet title.
 * @param {string} props.snippets.language - The snippet programming language.
 * @param {string} props.snippets.code - The snippet code content.
 * @param {Array<string>} props.snippets.tags - An array of tags associated with the snippet.
 * @param {string} props.snippets.createdAt - The creation date of the snippet.
 * @param {string} props.snippets.lastUsed - The last used date of the snippet.
 * @param {number} props.snippets.copyCount - The number of times the snippet has been copied.
 * @param {function} props.onDeleteSnippet - Handler for when a snippet delete button is clicked.
 * @param {function} props.onEditSnippet - Handler for when a snippet edit button is clicked.
 */
function SnippetList({ snippets, onDeleteSnippet, onEditSnippet }) {
  const [expandedSnippets, setExpandedSnippets] = useState({});
  // State to track which snippet's tags are being edited
  const [editingSnippetId, setEditingSnippetId] = useState(null);
  // State to hold the tag input value during editing
  const [tagInputValue, setTagInputValue] = useState('');

  const { handleIncreaseCopyCount, handleUpdateSnippet } = useDashboardContext();

  const handleCopyClick = (snippet) => {
    navigator.clipboard.writeText(snippet.code)
      .then(() => {
        alert('Snippet copied to clipboard!');
        handleIncreaseCopyCount(snippet.id);
      })
      .catch(err => {
        console.error('Failed to copy snippet: ', err);
        alert('Failed to copy snippet.');
      });
  };

  const toggleExpand = (snippetId) => {
    setExpandedSnippets(prevState => ({
      ...prevState,
      [snippetId]: !prevState[snippetId]
    }));
  };

  // Function to start editing tags
  const handleEditTags = (snippet) => {
    setEditingSnippetId(snippet.id);
    setTagInputValue(snippet.tags.join(', ')); // Initialize input with current tags
  };

  // Function to save edited tags
  const handleSaveTags = async (snippetId, currentSnippet) => {
    const updatedTags = tagInputValue.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    // Call the update snippet function with the new tags, preserving other data
    await handleUpdateSnippet(snippetId, { ...currentSnippet, manualTags: updatedTags,createdAt:null,updatedAt:null });
    // Exit editing mode
    setEditingSnippetId(null);
    setTagInputValue('');
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditingSnippetId(null);
    setTagInputValue('');
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {snippets.length > 0 ? (
        snippets.map(snippet => {
          const isExpanded = !!expandedSnippets[snippet.id];
          const linesOfCode = snippet.code.split('\n');
          const isTruncated = linesOfCode.length > 5 && !isExpanded;
          const isEditing = editingSnippetId === snippet.id;

          return (
            <div key={snippet.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm relative">
              {/* Copy, Edit, and Delete buttons positioned absolutely */}
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                {/* Edit button */}
                {onEditSnippet && (
                  <button
                    className="p-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
                    onClick={() => onEditSnippet(snippet)}
                    aria-label="Edit snippet"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                )}
                {/* Copy button */}
                <button
                  className="p-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition-colors"
                  onClick={() => handleCopyClick(snippet)}
                  aria-label="Copy snippet code"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {onDeleteSnippet && (
                  <button
                    className="p-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors"
                    onClick={() => onDeleteSnippet(snippet.id)}
                    aria-label="Delete snippet"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 pr-16">{snippet.title}</h3>

              <div className="text-sm text-gray-400 mb-3">
                {/* Syntax highlighted code block */}
                <SyntaxHighlighter
                  style={atomOneDark}
                  language={snippet.language}
                  showLineNumbers={false}
                  wrapLines={true}
                  lineProps={lineNumber => ({
                    style: { overflowX: 'auto' },
                  })}
                  customStyle={{
                    maxHeight: isExpanded ? 'none' : '80px',
                    overflowY: isExpanded ? 'visible' : 'hidden',
                    fontSize: '0.875rem',
                    paddingTop: '1.5rem',
                    backgroundColor: '#1e2124',
                  }}
                >
                  {isTruncated ? linesOfCode.slice(0, 5).join('\n') : snippet.code}
                </SyntaxHighlighter>
              </div>

              {linesOfCode.length > 5 && (
                <button
                  className="text-blue-400 hover:underline text-xs flex items-center gap-1 mt-2 mb-3"
                  onClick={() => toggleExpand(snippet.id)}
                >
                  {isExpanded ? ( <><ChevronUp className="w-3 h-3" /> Show Less</> ) : ( <><ChevronDown className="w-3 h-3" /> Show More</> )}
                </button>
              )}

              {/* Tags Section */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">{snippet.language}</span>
                {isEditing ? (
                  // Editable tags input
                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      type="text"
                      value={tagInputValue}
                      onChange={(e) => setTagInputValue(e.target.value)}
                      className="flex-grow p-1 text-sm bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                      placeholder="Enter tags separated by commas"
                    />
                    <button
                      className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition-colors"
                      onClick={() => handleSaveTags(snippet.id, snippet)}
                    >Save</button>
                    <button
                      className="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-xs transition-colors"
                      onClick={handleCancelEdit}
                    >Cancel</button>
                  </div>
                ) : (
                  // Static tags display
                  <div className="flex items-center gap-2 flex-wrap cursor-pointer" onClick={() => handleEditTags(snippet)}>
                    {snippet.tags && snippet.tags.map((tag, index) => (
                      <span key={tag} className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${tagColors[index % tagColors.length]}`}>
                        <Tag className="w-3 h-3" />{tag}
                      </span>
                    ))}
                    {/* Add a prompt to click to edit if no tags exist */}
                    {(!snippet.tags || snippet.tags.length === 0) && (
                       <span className="text-xs text-gray-400 italic">Click to add tags</span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center text-xs text-gray-500 gap-4">
                <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" /> Created: {snippet.createdAt}</span>
                {/* Display updated date instead of last used */}
                {snippet.updatedAt && (
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Last Used: {snippet.updatedAt}</span>
                )}
                {/* Display copy count */}
                {snippet.copyCount !== undefined && (
                  <span className="flex items-center gap-1 text-blue-400 font-semibold">
                    <Copy className="w-3 h-3" /> Copied: {snippet.copyCount}
                  </span>
                )}
              </div>
            </div>
          )
        })
      ) : (
        <div className="text-gray-400 text-center py-8">
          {snippets === null ? 'Loading snippets...' : 'No snippets found.'}
        </div>
      )}
    </div>
  )
}

export default SnippetList 