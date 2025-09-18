"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import LayoutWithSidebar from "@/components/layout-with-sidebar"
import LoadingSpinner from "@/components/loading-spinner"
import ErrorMessage from "@/components/error-message"
import Modal from "@/components/modal"
import { useFetch } from "@/hooks/use-fetch"

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
  }
}

export default function UsersPage() {
  const { data: users, loading, error, refetch } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
  }

  const closeModal = () => {
    setSelectedUser(null)
  }

  return (
    <LayoutWithSidebar>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Users</h1>
          <p className="text-muted-foreground">Click on any user to view their detailed information</p>
        </motion.div>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && (
          <div className="py-8">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        )}

        {users && (
          <motion.div
            className="bg-card border border-border rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      className="hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => handleUserClick(user)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-foreground">{user.name}</div>
                          <div className="text-sm text-muted-foreground">@{user.username}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{user.company.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{user.phone}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-border">
              {users.map((user, index) => (
                <motion.div
                  key={user.id}
                  className="p-4 hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => handleUserClick(user)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-foreground">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                      <p className="text-sm text-foreground mt-1">{user.email}</p>
                      <p className="text-sm text-muted-foreground">{user.company.name}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <Modal isOpen={!!selectedUser} onClose={closeModal} title="User Details">
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{selectedUser.name}</h3>
                <p className="text-sm text-muted-foreground">@{selectedUser.username}</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Phone</label>
                  <p className="text-sm text-muted-foreground">{selectedUser.phone}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Website</label>
                  <p className="text-sm text-muted-foreground">{selectedUser.website}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Company</label>
                  <p className="text-sm text-muted-foreground">{selectedUser.company.name}</p>
                  <p className="text-xs text-muted-foreground italic">"{selectedUser.company.catchPhrase}"</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Address</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser.address.suite} {selectedUser.address.street}
                    <br />
                    {selectedUser.address.city} {selectedUser.address.zipcode}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </LayoutWithSidebar>
  )
}
