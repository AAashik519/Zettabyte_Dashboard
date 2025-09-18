"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import AnimatedSidebar from "./animated-sidebar"

interface LayoutWithSidebarProps {
  children: React.ReactNode
}

function LayoutWithSidebarComponent({ children }: LayoutWithSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatedSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <motion.main
        className="transition-all duration-300 ease-in-out"
        style={{
          marginLeft: sidebarOpen ? 256 : 64,
        }}
        animate={{
          marginLeft: sidebarOpen ? 256 : 64,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.main>
    </div>
  )
}

export const LayoutWithSidebar = LayoutWithSidebarComponent

export default LayoutWithSidebarComponent
