"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import CreateFolderAndSnippet from './components/CreateFolderAndSnippet'
import FolderList from './components/FolderList'
import SearchInput from './components/SearchInput'
import SnippetList from './components/SnippetList'
import AddFolderModal from './components/AddFolderModal'
import AddSnippetModal from './components/AddSnippetModal'
import { useDashboardContext } from '@/contextApi/DashboardContext'
import { useUserContext } from '@/contextApi/UserContext'
import { ROUTE_HOME } from '@/constants/endpoints'
import LoadingBar from '@/components/LoadingBar'
import Header from "./components/Header";

export const DashboardPage = () => {
  // Use context to access dashboard state and functions
  const {
    userFolders,
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
    openAddSnippetModal: contextOpenAddSnippetModal,
    closeAddSnippetModal: contextCloseAddSnippetModal,
    handleCreateSnippet,
    handleUpdateSnippet,
    filterType,
    handleFilterTypeChange,
  } = useDashboardContext();

  const { isLoggedIn, loading } = useUserContext();
  const router = useRouter();

  // State to manage which snippet is being edited
  const [editingSnippet, setEditingSnippet] = useState(null);

  // Handler to open the Add/Edit Snippet Modal in create mode
  const openAddSnippetModal = () => {
    setEditingSnippet(null); // Ensure no snippet is being edited when creating
    contextOpenAddSnippetModal();
  };

  // Handler to open the Add/Edit Snippet Modal in edit mode
  const handleEditSnippet = (snippet) => {
    setEditingSnippet(snippet); // Set the snippet to be edited
    contextOpenAddSnippetModal();
  };

  // Handler to close the Add/Edit Snippet Modal and reset editing state
  const closeAddSnippetModal = () => {
    contextCloseAddSnippetModal();
    setEditingSnippet(null); // Reset editing state on close
  };

  // Effect to check authentication status once on mount
  // useEffect(() => {

  //   checkAuthStatus();
  // }, []);

  // Effect to redirect if not logged in after loading is complete
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push(ROUTE_HOME);
    }
  }, [isLoggedIn, loading, router]);

  // Optionally, you might want to show a loading state for the page itself
  // while the context is checking authentication.
  if (loading) {
    return <LoadingBar />;
  }

  // Only render the dashboard content if logged in (after loading)
  if (!isLoggedIn && !loading) {
      return null; // Or render a message/component indicating redirection
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
            <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column / Sidebar Area (Folders) */}
          <div className="md:col-span-1 flex flex-col gap-6">
             <CreateFolderAndSnippet 
               onCreateFolderClick={openAddFolderModal} 
               onCreateSnippetClick={openAddSnippetModal}
             />
             <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
               <FolderList
                 folders={userFolders}
                 onSelectFolder={handleFolderSelect}
                 selectedFolder={selectedFolder}
                 onPinFolder={handlePinFolder}
                 onDeleteFolder={handleDeleteFolder}
               />
             </div>
          </div>

          {/* Right Column / Main Content Area (Search & Snippets) */}
          <div className="md:col-span-2 flex flex-col">
            {/* Search Input and Filter Selection */}
            <div className="flex gap-4 items-center mb-6">
              <div className="flex-grow">
                <SearchInput searchTerm={searchTerm} onSearchChange={handleSearchChange} />
              </div>
              <div className="w-1/4">
                 <select
                   className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                   value={filterType}
                   onChange={(e) => handleFilterTypeChange(e.target.value)}
                 >
                   <option value="all">All</option>
                   <option value="tag">Tag</option>
                   <option value="language">Language</option>
                   <option value="usage">Usage (Copy Count)</option>
                 </select>
              </div>
            </div>

            {/* Placeholder for Snippet List */}
            <div className="mt-6">
               <h2 className="text-xl font-bold text-white mb-4">
                 {selectedFolder ? `Snippets in '${selectedFolder.name}'` : 'All Snippets'}
               </h2>
               <SnippetList snippets={filteredSnippets} onDeleteSnippet={handleDeleteSnippet} onEditSnippet={handleEditSnippet} />
            </div>

          </div>
        </div>
      </main>
      <AddFolderModal
        isOpen={isAddFolderModalOpen}
        onClose={closeAddFolderModal}
        onCreate={handleCreateFolder}
      />
      <AddSnippetModal
        isOpen={isAddSnippetModalOpen}
        onClose={closeAddSnippetModal}
        onCreate={handleCreateSnippet}
        folders={userFolders}
        editingSnippet={editingSnippet}
        onUpdate={handleUpdateSnippet}
      />
    </div>
  )
} 