// Import language definitions
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
// import html from 'react-syntax-highlighter/dist/esm/languages/hljs/html';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';

// Export language definitions for potential later use if needed elsewhere
export const languages = {
  javascript,
  css,
  python,
//   html,
  json,
  xml,
  java,
  cpp,
};

// Note: This file assumes SyntaxHighlighter is imported and available where this registration function is called.
export function registerSyntaxHighlighterLanguages(SyntaxHighlighterInstance) {
  SyntaxHighlighterInstance.registerLanguage('javascript', javascript);
  SyntaxHighlighterInstance.registerLanguage('css', css);
  SyntaxHighlighterInstance.registerLanguage('python', python);
  SyntaxHighlighterInstance.registerLanguage('json', json);
  SyntaxHighlighterInstance.registerLanguage('xml', xml);
  SyntaxHighlighterInstance.registerLanguage('java', java);
  SyntaxHighlighterInstance.registerLanguage('cpp', cpp);
  // Add other languages here as needed
} 