"use client"
import React, { useState } from 'react'
import { Copy, Tag, CalendarDays, Clock, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
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
 */
function SnippetList({ snippets, onDeleteSnippet }) {
  const [expandedSnippets, setExpandedSnippets] = useState({});
  const { handleIncreaseCopyCount } = useDashboardContext();

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

  return (
    <div className="grid grid-cols-1 gap-4">
      {snippets.length > 0 ? (
        snippets.map(snippet => {
          const isExpanded = !!expandedSnippets[snippet.id];
          const linesOfCode = snippet.code.split('\n');
          const isTruncated = linesOfCode.length > 5 && !isExpanded;

          return (
            <div key={snippet.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm relative">
              {/* Copy and Delete buttons positioned absolutely */}
              <div className="absolute top-2 right-2 flex gap-2 z-10">
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

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">{snippet.language}</span>
                {snippet.tags && snippet.tags.map((tag, index) => (
                  <span key={tag} className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${tagColors[index % tagColors.length]}`}>
                     <Tag className="w-3 h-3" />{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center text-xs text-gray-500 gap-4">
                <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" /> Created: {snippet.createdAt}</span>
                {/* Display updated date instead of last used */}
                {snippet.updatedAt && (
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Updated: {snippet.updatedAt}</span>
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