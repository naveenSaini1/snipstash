// Client-side Routes
export const ROUTE_HOME = "/"
export const ROUTE_LOGIN = "/login"
export const ROUTE_REGISTER = "/register"
export const ROUTE_DASHBOARD = "/dashboard"

// Backend API Endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';
export const AUTH_PREFIX = '/auth';
export const USER_PREFIX = '/user'
export const FOLDERS_PREFIX = '/folders';
export const SNIPPETS_PREFIX = '/snippets';

export const API_ENDPOINTS = {
  // Auth
  login: '/signin',
  register: '/signup',
  me: '/me',
  // Folders
  createFolder: '/createfolder',
  deleteFolder: '/deletefolder',
  getAllFolders: '/all',
  // Snippets
  createSnippet: '/create',
  deleteSnippet: '/delete',
  getAllSnippets: '/all',
  updateSnippet: '/update',
  // Add other endpoints here
}; 