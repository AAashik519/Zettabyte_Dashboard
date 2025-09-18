"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { use } from "react"
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

interface User {
  id: number
  name: string
  email: string
  website: string
  company: {
    name: string
  }
}

interface PostPageProps {
  params: Promise<{ id: string }>
}

export default function PostPage({ params }: PostPageProps) {
  const { id } = use(params)

  const {
    data: post,
    loading: postLoading,
    error: postError,
    refetch: refetchPost,
  } = useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch<User>(post ? `https://jsonplaceholder.typicode.com/users/${post.userId}` : "", { immediate: !!post })

  const loading = postLoading || (post && userLoading)
  const error = postError || userError

  return (
    <LayoutWithSidebar>
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link
            href="/posts"
            className="text-primary hover:text-primary/80 transition-colors text-sm font-medium mb-4 inline-block"
          >
            ← Back to Posts
          </Link>
        </motion.div>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && (
          <div className="py-8">
            <ErrorMessage message={error} onRetry={refetchPost} />
          </div>
        )}

        {post && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Post #{post.id}</span>
                  {user && <span className="text-sm text-muted-foreground">by {user.name}</span>}
                </div>
                <CardTitle className="text-2xl text-balance">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{post.body}</p>
              </CardContent>
            </Card>

            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>About the Author</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Name:</span> {user.name}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {user.email}
                      </p>
                      <p>
                        <span className="font-medium">Website:</span> {user.website}
                      </p>
                      <p>
                        <span className="font-medium">Company:</span> {user.company.name}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </LayoutWithSidebar>
  )
}
