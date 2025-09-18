"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card } from "@/components/card"
import { motion } from "framer-motion"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) router.push("/auth/signin") // Not authenticated
  }, [session, status, router])

  if (status === "loading") {
    return (
      <LayoutWithSidebar>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </LayoutWithSidebar>
    )
  }

  if (!session) {
    return null // Will redirect
  }

  return (
    <LayoutWithSidebar>
      <div className="p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

          <div className="grid gap-6 md:grid-cols-2">
            {/* User Information Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6">
                <Card.Header className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">User Information</h2>
                </Card.Header>
                <Card.Content>
                  <div className="flex items-center gap-4 mb-6">
                    {session.user?.image && (
                      <img
                        src={session.user.image || "/placeholder.svg"}
                        alt={session.user.name || "User"}
                        className="w-16 h-16 rounded-full border-2 border-gray-200"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{session.user?.name}</h3>
                      <p className="text-gray-600">{session.user?.email}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                        {session.user?.name || "Not provided"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                        {session.user?.email || "Not provided"}
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </motion.div>

            {/* Account Activity Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6">
                <Card.Header className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Account Activity</h2>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-800">Account Status</span>
                      <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-blue-800">Last Sign In</span>
                      <span className="text-sm text-blue-600">Just now</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium text-purple-800">Account Type</span>
                      <span className="text-sm text-purple-600">Standard User</span>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </motion.div>

            {/* Quick Actions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2"
            >
              <Card className="p-6">
                <Card.Header className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                </Card.Header>
                <Card.Content>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push("/posts")}
                      className="p-4 bg-blue-50 rounded-lg text-left hover:bg-blue-100 transition-colors duration-200"
                    >
                      <div className="text-blue-600 font-medium mb-1">View Posts</div>
                      <div className="text-sm text-blue-500">Browse all posts</div>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push("/users")}
                      className="p-4 bg-green-50 rounded-lg text-left hover:bg-green-100 transition-colors duration-200"
                    >
                      <div className="text-green-600 font-medium mb-1">View Users</div>
                      <div className="text-sm text-green-500">See all users</div>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push("/")}
                      className="p-4 bg-purple-50 rounded-lg text-left hover:bg-purple-100 transition-colors duration-200"
                    >
                      <div className="text-purple-600 font-medium mb-1">Dashboard</div>
                      <div className="text-sm text-purple-500">Go to dashboard</div>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="text-gray-600 font-medium mb-1">Settings</div>
                      <div className="text-sm text-gray-500">Account settings</div>
                    </motion.button>
                  </div>
                </Card.Content>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </LayoutWithSidebar>
  )
}
