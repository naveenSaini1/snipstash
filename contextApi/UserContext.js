"use client"
import useFetchApi from "@/hooks/useFetchApi"
import React, { createContext, useContext, useState, useMemo, useEffect } from "react"
import { API_ENDPOINTS, API_BASE_URL, AUTH_PREFIX, ROUTE_DASHBOARD, ROUTE_HOME, USER_PREFIX } from '@/constants/endpoints'
import { LOCAL_STORAGE_USER_KEY } from '@/constants/constants'
import { setItem, getItem, removeItem } from '@/store/localStorageStore'
import LoadingBar from "@/components/LoadingBar"
import { useRouter } from "next/navigation"

/**
 * UserContext provides authentication and user state for the app.
 */
const UserContext = createContext(null)

/**
 * UserContextProvider wraps children and provides user authentication state and logic.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const { fetchApi } = useFetchApi()
  const router = useRouter()

  useEffect(() => {
    const storedUser = getItem(LOCAL_STORAGE_USER_KEY)
    if (storedUser) {
      setUser(storedUser)
      setIsLoggedIn(true)
      // Optionally call checkAuthStatus here on mount to verify token validity
      checkAuthStatus();
    }
    setLoading(false)
  }, [])

  /**
   * Validate email format.
   * @param {string} email
   * @returns {boolean}
   */
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  /**
   * Register a new user.
   * @param {Object} param0
   * @param {string} param0.name
   * @param {string} param0.email
   * @param {string} param0.password
   * @returns {Promise<Object>} - An object with success status and user data or error.
   */
  const register = async (obj) => {
    try {
      const result = await fetchApi({
        url: `${API_BASE_URL}${AUTH_PREFIX}${API_ENDPOINTS.register}`,
        method: 'POST',
        body: obj,
      })

      console.log('Registration successful:', result)

      setItem(LOCAL_STORAGE_USER_KEY, result)

      setUser(result)
      setIsLoggedIn(true)
      setLoading(false)
      // Redirect to dashboard on successful registration
      router.push(ROUTE_DASHBOARD)
      return { success: true, user: result }
    } catch (error) {
      console.error('Error during registration:', error)
      setLoading(false)
      return { success: false, error: error.message || 'An unexpected error occurred during registration.' }
    }
  }

  /**
   * Login user.
   * @param {Object} param0
   * @param {string} param0.email
   * @param {string} param0.password
   * @returns {Promise<Object>} - An object with success status and user data or error.
   */
  const login = async (obj) => {
    // setLoading(true)
    try {
      const result = await fetchApi({
        url: `${API_BASE_URL}${AUTH_PREFIX}${API_ENDPOINTS.login}`,
        method: 'POST',
        body: obj,
      })
      if (result == null) return;
      console.log('Login successful:', result)

      setItem(LOCAL_STORAGE_USER_KEY, result)

      setUser(result)
      setIsLoggedIn(true)
      // setLoading(false)
      // Redirect to dashboard on successful login
      router.push(ROUTE_DASHBOARD)
      return { success: true, user: result }
    } catch (error) {
      console.error('Error during login:', error)
      // setLoading(false)
      return { success: false, error: error.message || 'An unexpected error occurred during login.' }
    }
  }

  /**
   * Simulate a logout action.
   */
  const logout = () => {
    removeItem(LOCAL_STORAGE_USER_KEY)

    setUser(null)
    setIsLoggedIn(false)
    // Redirect to home page on logout
    router.push(ROUTE_HOME)
  }

  /**
   * Checks the authentication status by calling the /me endpoint.
   * Updates user state based on the response.
   * @returns {Promise<boolean>} - True if authenticated, false otherwise.
   */
  const checkAuthStatus = async () => {
    setLoading(true)
    const storedUser = getItem(LOCAL_STORAGE_USER_KEY)

    if (!storedUser || !storedUser.token) {
      // No token found, user is not logged in
      setUser(null)
      setIsLoggedIn(false)
      setLoading(false)
      return false
    }
    
    try {
      // Use fetchApi hook to call the new Next.js API route
      const result = await fetchApi({
        url: '/api/user/me', // Call the new API route
        method: 'GET',
        token: storedUser.token, // Pass the token to the API route
        body: null, // GET request does not have a body
      });

      // Check if the result is null (indicating an error handled by fetchApi)
      if (result === null) {
         // fetchApi has already handled the error and updated state
         // No further action needed here for error case
         setUser(null)
         setIsLoggedIn(false)
         setLoading(false);
         removeItem(LOCAL_STORAGE_USER_KEY)
         // Redirect to home page on logout
         router.push(ROUTE_HOME)
      }

      // Assuming successful response from API route contains user data
      console.log('Auth check successful via API route:', result);

      // Update context state with fresh user data from the API route response
      setIsLoggedIn(true);
      setLoading(false);
      return true;

    } catch (error) {
      // This catch block handles errors thrown by fetchApi
      console.error('Error during auth check via API route:', error);
      // fetchApi has already handled the error and updated state
      // No further action needed here
      setLoading(false);
      return false;
    }
  }

  const contextValue = useMemo(() => ({
    user,
    isLoggedIn,
    loading,
    login,
    register,
    logout,
    checkAuthStatus,
  }), [user, isLoggedIn, loading, login, register, logout, checkAuthStatus])

  if (loading) {
    return <LoadingBar />
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

/**
 * Custom hook to use the UserContext.
 */
export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider')
  }
  return context
} 