"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/posts"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/posts") || pathname?.startsWith("/posts")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Posts
            </Link>
            <Link
              href="/users"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/users") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Users
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
