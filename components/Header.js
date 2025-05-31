"use client"
import { Code } from "lucide-react"
import React from "react"
import Link from "next/link"
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_REGISTER } from "@/constants/endpoints"
import { useUserContext } from "@/contextApi/UserContext"

/**
 * Sticky top navbar for SnipStash landing page.
 */
function Header() {
  const { isLoggedIn, logout } = useUserContext()

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900 border-b border-gray-800 shadow-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href={ROUTE_HOME} className="text-2xl font-mono font-bold text-white tracking-tight select-none flex items-center gap-2 cursor-pointer">
          <Code className="w-8 h-8 text-blue-400" />
          SnipStash
        </Link>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="text-gray-300 hover:text-white transition-colors font-medium focus:outline-none"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href={ROUTE_LOGIN} className="text-gray-300 hover:text-white transition-colors font-medium">Login</Link>
              <Link href={ROUTE_REGISTER} className="text-gray-100 bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded font-semibold">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header 