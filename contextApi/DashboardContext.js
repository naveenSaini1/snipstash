"use client";

import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import useFetchApi from "@/hooks/useFetchApi";
import { API_BASE_URL, FOLDERS_PREFIX, API_ENDPOINTS, SNIPPETS_PREFIX } from '@/constants/endpoints';
import { useUserContext } from '@/contextApi/UserContext';

const DashboardContext = createContext(null);

// Helper function to generate tags string from code and manual tags
const generateTagsString = (code, manualTags = []) => {
    let generatedTags = [];

    // Auto-tagging logic
    if (code.match(/\b(?:for|while)\b/)) generatedTags.push('loop');
    if (code.match(/\b(?:fetch|axios|XMLHttpRequest)\b/)) generatedTags.push('API');
    if (code.match(/\btry\s*{\s*.*}\s*catch\s*\(/s)) generatedTags.push('error handling');
    if (code.match(/\b(?:map|filter|reduce|forEach)\(\)/)) generatedTags.push('array ops');
    if (code.match(/\bconsole\.log\(/)) generatedTags.push('debugging');
    // Add more rules as needed

    // Combine manual and generated tags, removing duplicates and filtering out empty strings
    const allTags = [...new Set([...manualTags, ...generatedTags])].filter(tag => tag.trim() !== '');

    // Return as a comma-separated string
    return allTags.join(',');
};

export const DashboardContextProvider = ({ children }) => {
  // Move state and logic from DashboardPage.js here

  const { fetchApi, loading: fetchLoading, error: fetchError } = useFetchApi();
  const { user, isLoggedIn } = useUserContext(); // Get user and isLoggedIn from UserContext

  // State for snippets and folders
  const [snippets, setSnippets] = useState([]); // Initialize with empty array, will fetch
  const [userFolders, setUserFolders] = useState([]); // Initialize with empty array, will fetch

  // State for selected folder and search term
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // State for modals
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
  const [isAddSnippetModalOpen, setIsAddSnippetModalOpen] = useState(false);

  // Effect to fetch folders when user is logged in and context initializes
  useEffect(() => {
    const fetchFolders = async () => {
      if (!isLoggedIn || !user || !user.token) {
        console.log("User not logged in. Skipping initial folder fetch.");
        return;
      }
      console.log("Fetching folders...");
      try {
        const result = await fetchApi({
          url: '/api/folders/all', // Call the new Next.js API route
          method: 'GET',
          token: user.token, // Pass the user's token to the API route
        });

        if (result) {
          console.log('Folders fetched successfully:', result);
          // Assuming the API returns a list of folders
          // Add a 'All My Snippets' default folder at the beginning
          const allSnippetsFolder = {
             id: null, 
             name: "All My Snippets", 
             snippetCount: 0, // Will update this when snippets are fetched
             isDefault: true,
             snippets: [], // Will populate this when snippets are fetched
          };
          // TODO: Update snippet count for existing folders based on fetched snippets (will be done after snippets are fetched)
          setUserFolders([allSnippetsFolder, ...result]);
        } else {
          console.error("Failed to fetch folders via API route.");
        }
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, [isLoggedIn, user, fetchApi]); // Depend on isLoggedIn, user, and fetchApi

  // Effect to fetch snippets when user is logged in and context initializes
  useEffect(() => {
    const fetchSnippets = async () => {
        if (!isLoggedIn || !user || !user.token) {
            console.log("User not logged in. Skipping initial snippet fetch.");
            return;
        }
        console.log("Fetching snippets...");
        try {
            const result = await fetchApi({
                url: '/api/snippets/all', // Call the new Next.js API route
                method: 'GET',
                token: user.token, // Pass the user's token
            });

            if (result) {
                console.log('Snippets fetched successfully:', result);
                // Assuming the API returns a list of snippets
                // Process snippets to convert tags string to array
                const processedSnippets = result.map(snippet => ({
                    ...snippet,
                    tags: typeof snippet.tags === 'string' && snippet.tags !== '' ? snippet.tags.split(',').map(tag => tag.trim()) : []
                }));
                setSnippets(processedSnippets);
                // TODO: Update snippetCount for folders based on fetched snippets
            } else {
                console.error("Failed to fetch snippets via API route.");
            }
        } catch (error) {
            console.error("Error fetching snippets:", error);
        }
    };

    fetchSnippets();
  }, [isLoggedIn, user, fetchApi]); // Depend on isLoggedIn, user, and fetchApi

  // Effect to update folders with snippet counts and embedded snippets
  // This effect is necessary for the UI to correctly display snippet counts and lists per folder.
   useEffect(() => {
    if (userFolders.length > 0 && snippets.length >= 0) { // Ensure folders are fetched and snippets have been attempted to fetch (can be 0)
      const updatedFolders = userFolders.map(folder => {
        if (folder.isDefault) {
          // 'All My Snippets' folder
          return {
            ...folder,
            snippetCount: snippets.length,
            snippets: snippets // Include all snippets
          };
        } else {
          // Regular folders
          const folderSnippets = snippets.filter(snippet =>
             // Check if the snippet's folders array includes the current folder's ID
             snippet.folders && snippet.folders.includes(folder.id)
          );
          return {
            ...folder,
            snippetCount: folderSnippets.length,
            snippets: folderSnippets // Include only relevant snippets
          };
        }
      });
      // Only update if there's a significant change to avoid infinite loops
      // A simple length check might be sufficient, or a deeper comparison if necessary
       if (JSON.stringify(updatedFolders.map(f => ({id: f.id, snippetCount: f.snippetCount}))) !== JSON.stringify(userFolders.map(f => ({id: f.id, snippetCount: f.snippetCount})))) {
           console.log("Updating user folders with snippet counts.");
           setUserFolders(updatedFolders);
       }
    }
  }, [snippets, userFolders]); // Depend on snippets and userFolders

  // Filter snippets based on selected folder and search term
  const filteredSnippets = useMemo(() => {
    return snippets.filter(snippet => {
      const matchesFolder = selectedFolder === null || (snippet.folders && snippet.folders.includes(selectedFolder.id));
      const matchesSearch = searchTerm.toLowerCase() === '' ||
                            snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            snippet.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (snippet.tags && snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
                            snippet.language.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFolder && matchesSearch;
    });
  }, [snippets, selectedFolder, searchTerm]);

  const handleFolderSelect = (folder) => {
    if (folder.id === null) {
      setSelectedFolder(null);
    } else {
      setSelectedFolder(folder);
    }
    // Optionally clear search term when selecting a folder
    // setSearchTerm('');
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    // Optionally clear selected folder when searching
    // setSelectedFolder(null);
  };

  // Handlers for modals
  const openAddFolderModal = () => setIsAddFolderModalOpen(true);
  const closeAddFolderModal = () => setIsAddFolderModalOpen(false);

  const openAddSnippetModal = () => setIsAddSnippetModalOpen(true);
  const closeAddSnippetModal = () => setIsAddSnippetModalOpen(false);

  // Handler to create a new snippet
  const handleCreateSnippet = async (snippetData) => {
    console.log('Attempting to create snippet with data:', snippetData);
    if (!isLoggedIn || !user || !user.token) {
      console.error('User not logged in.');
      // Optionally redirect to login or show an error message
      return;
    }

    const { folderId, title, language, code, manualTags } = snippetData;

    if (!folderId || !title || !language || !code) {
      console.error('Missing required snippet data.', { folderId, title, language, code });
      return;
    }

    // Generate the tags string using the helper function
    const tagsString = generateTagsString(code, manualTags);

    const snippetToCreate = {
      folderId: folderId,
      title: title,
      language: language,
      code: code,
      tags: tagsString, // Use the generated tags string
      copyCount: 0, // Assuming initial copy count is 0
      // createdAt and updatedAt will likely be set by the backend
    };

    console.log('Sending snippet creation request to Next.js API route with data:', snippetToCreate);

    try {
      // Call the new Next.js API route for creating a snippet
      const result = await fetchApi({
        url: '/api/snippets/create', // Call the new Next.js API route
        method: 'POST',
        token: user.token, // Pass the user's token to the API route
        body: snippetToCreate, // Send snippet details in the body to the API route
      });

    // Assuming the Next.js API route returns the created snippet object
        console.log('Snippet created successfully via API route:', result);
        // Assuming the API returns the full snippet object including ID, dates, etc.
        // Convert tags array from the returned snippet if needed (backend might return string or array)
        const createdSnippet = {
          ...snippetToCreate,
          id:result,
          tags: typeof snippetToCreate.tags === 'string' && snippetToCreate.tags !== '' ? snippetToCreate.tags.split(',').map(tag => tag.trim()) : []

        };

        // Add the new snippet to the state
        setSnippets(prevSnippets => [...prevSnippets, createdSnippet]);
        closeAddSnippetModal(); // Close modal on success
        // TODO: Update snippetCount for affected folders
        // Optionally show a success message
     
    } catch (error) {
      console.error('Error creating snippet:', error);
      // Optionally show an error message to the user
    }
  };

  const handleDeleteSnippet = async (snippetId) => {
    console.log(`Attempting to delete snippet with ID: ${snippetId}`);

    if (!user || !user.token) {
      console.error("User not authenticated. Cannot delete snippet.");
      // Optionally show an error message to the user
      return;
    }

    try {
      // Call the new Next.js API route for deleting a snippet
      const result = await fetchApi({
        url: `/api/snippets/${snippetId}`, // Call the new Next.js API route with ID
        method: 'DELETE',
        token: user.token, // Pass the user's token to the API route
      });

    
        console.log('Snippet deleted successfully via API route:', result);
        // Assuming the API returns a success indicator or message
        // Remove the deleted snippet from the snippets state
        setSnippets(prevSnippets => prevSnippets.filter(snippet => snippet.id !== snippetId));
        // TODO: Update snippetCount for affected folders
    
   
    } catch (error) {
      console.error('Error deleting snippet via API route:', error);
      // fetchApi already handled the error logging and state update
      // Optionally show a user-friendly error message here
    }
  };

   const handleCreateFolder = async (folderName) => {
    console.log(`Attempting to create folder: ${folderName}`);
    console.log(user);
    if (!user || !user.token) {
      console.error("User not authenticated. Cannot create folder.");
      // Optionally show an error message to the user
      return;
    }

    try {
      const result = await fetchApi({
        url: '/api/folders/create', // Call the new Next.js API route
        method: 'POST',
        token: user.token, // Pass the user's token to the API route
        body: { name: folderName }, // Send folder name in the body to the API route
      });

      if (result) { // Check if result is not null and contains an id
        console.log('Folder created successfully via API route. Received ID:', result.id);
        
        // Construct the folder object using the name and the received ID
        const newFolder = {
          id: result, // Use the ID from the backend response
          name: folderName,
          snippetCount: 0, // Initial snippet count is 0
          snippets: [], // Initially empty snippets array
          isDefault: false, // New folders are not default
        };

        // Add the new folder to the userFolders state
        setUserFolders(prevFolders => [...prevFolders, newFolder]);
        closeAddFolderModal(); // Close modal after successful creation
      } else {
         // fetchApi already handled the error logging and state update
         // Or backend did not return an ID in the expected format
         console.error("Failed to create folder via API route or invalid response.");
         // Optionally show a user-friendly error message here
      }

    } catch (error) {
      console.error('Error creating folder via API route:', error);
      // fetchApi already handled the error logging and state update
      // Optionally show a user-friendly error message here
    }
  };

  const handlePinFolder = (folderId) => {
    console.log(`Pinning folder with ID from context: ${folderId}`);
    // Implement actual pin logic here
  };

  const handleDeleteFolder = async (folderId) => {
    console.log(`Attempting to delete folder with ID: ${folderId}`);

    if (!user || !user.token) {
      console.error("User not authenticated. Cannot delete folder.");
      // Optionally show an error message to the user
      return;
    }

    try {
      // Call the new Next.js API route for deleting a folder
      const result = await fetchApi({
        url: `/api/folders/${folderId}`, // Call the new Next.js API route with ID
        method: 'DELETE',
        token: user.token, // Pass the user's token to the API route
      });

      if (result) {
        console.log('Folder deleted successfully via API route:', result);
        // Assuming the API returns a success indicator or message
        // Remove the deleted folder from the userFolders state
        setUserFolders(prevFolders => prevFolders.filter(folder => folder.id !== folderId));
        // TODO: Update snippetCount for affected folders
      } else {
         // fetchApi already handled the error logging and state update
         console.error("Failed to delete folder via API route.");
         // Optionally show a user-friendly error message here
      }

    } catch (error) {
      console.error('Error deleting folder via API route:', error);
      // fetchApi already handled the error logging and state update
      // Optionally show a user-friendly error message here
    }
  };

  // Handler to increase snippet copy count
  const handleIncreaseCopyCount = async (snippetId) => {
    console.log(`Attempting to increase copy count for snippet with ID: ${snippetId}`);

    if (!user || !user.token) {
      console.error("User not authenticated. Cannot increase copy count.");
      // Optionally show an error message to the user
      return;
    }

    try {
      // Call the new Next.js API route for increasing copy count
      const result = await fetchApi({
        url: `/api/snippets/${snippetId}/increasecopycount`, // Call the new Next.js API route with ID
        method: 'PUT',
        token: user.token, // Pass the user's token to the API route
      });

     
        // Update the local state to increment the copy count
        setSnippets(prevSnippets =>
          prevSnippets.map(snippet =>
            snippet.id === snippetId ? { ...snippet, copyCount: snippet.copyCount + 1 } : snippet
          )
        );

        // Optionally show a success message to the user


    } catch (error) {
      console.error('Error increasing snippet copy count via API route:', error);
      // fetchApi already handled the error logging and state update
      // Optionally show a user-friendly error message here
    }
  };

  const contextValue = useMemo(() => ({
    userFolders,
    allSnippets: snippets, // Expose snippets as allSnippets for backward compatibility or clear naming
    selectedFolder,
    searchTerm,
    filteredSnippets,
    handleFolderSelect,
    handleSearchChange,
    handleDeleteSnippet,
    handlePinFolder,
    handleDeleteFolder,
    isAddFolderModalOpen,
    openAddFolderModal,
    closeAddFolderModal,
    handleCreateFolder,
    isAddSnippetModalOpen,
    openAddSnippetModal,
    closeAddSnippetModal,
    handleCreateSnippet,
    handleIncreaseCopyCount, // Add the new handler to the context value
  }), [userFolders, snippets, selectedFolder, searchTerm, filteredSnippets, handleDeleteSnippet, handlePinFolder, handleDeleteFolder, isAddFolderModalOpen, openAddFolderModal, closeAddFolderModal, handleCreateFolder, isAddSnippetModalOpen, openAddSnippetModal, closeAddSnippetModal, handleCreateSnippet, handleIncreaseCopyCount]);

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardContextProvider');
  }
  return context;
}; 