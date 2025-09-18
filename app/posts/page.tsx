"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import LayoutWithSidebar from "@/components/layout-with-sidebar"
import Card, { CardHeader, CardTitle, CardContent } from "@/components/card"
import LoadingSpinner from "@/components/loading-spinner"
import ErrorMessage from "@/components/error-message"
import { useFetch } from "@/hooks/use-fetch"

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export default function PostsPage() {
  const { data: posts, loading, error, refetch } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Posts</h1>
          <p className="text-muted-foreground">Browse through all available posts</p>
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

        {posts && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {posts.map((post) => (
              <motion.div key={post.id} variants={cardVariants}>
                <Link href={`/posts/${post.id}`}>
                  <Card hover className="h-full">
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-balance">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-sm leading-relaxed">{post.body}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Post #{post.id}</span>
                        <span className="text-xs text-muted-foreground">User {post.userId}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </LayoutWithSidebar>
  )
}
