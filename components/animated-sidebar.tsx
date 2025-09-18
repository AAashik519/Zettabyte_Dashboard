"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useSession } from "next-auth/react"
import { AuthButton } from "./auth-button"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function AnimatedSidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isActive = (path: string) => {
    return pathname === path || (path !== "/" && pathname?.startsWith(path))
  }

  const sidebarVariants = {
    open: {
      width: 256,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    closed: {
      width: 64,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const contentVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        delay: 0.1,
        ease: "easeOut",
      },
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  }

  const menuItems = [
    { href: "/", label: "Dashboard", icon: "🏠" },
    { href: "/posts", label: "Posts", icon: "📝" },
    { href: "/users", label: "Users", icon: "👥" },
    ...(session ? [{ href: "/profile", label: "Profile", icon: "👤" }] : []),
  ]

  return (
    <motion.div
      className="fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-30 flex flex-col"
      variants={sidebarVariants}
      animate={isOpen ? "open" : "closed"}
      initial="open"
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.h1
                className="text-lg font-bold text-sidebar-foreground"
                variants={contentVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                Dashboard
              </motion.h1>
            )}
          </AnimatePresence>
          <button
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
          >
            <motion.div animate={{ rotate: isOpen ? 0 : 180 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.div>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  isActive(item.href)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.span
                      className="ml-3 font-medium"
                      variants={contentVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div variants={contentVariants} initial="closed" animate="open" exit="closed" className="space-y-3">
              <div className="flex justify-center">
                <AuthButton />
              </div>
          
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <div className="flex justify-center">
            <AuthButton />
          </div>
        )}
      </div>
    </motion.div>
  )
}
