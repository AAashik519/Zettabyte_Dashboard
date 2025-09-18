"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

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
}

interface PostsChartProps {
  posts: Post[]
  users: User[]
  loading: boolean
}

export default function PostsChart({ posts, users, loading }: PostsChartProps) {
  const chartData = useMemo(() => {
    if (!posts || !users) return []

    const userPostCounts = posts.reduce(
      (acc, post) => {
        acc[post.userId] = (acc[post.userId] || 0) + 1
        return acc
      },
      {} as Record<number, number>,
    )

    return users
      .map((user) => ({
        name: user.name.split(" ")[0], // First name only for cleaner display
        posts: userPostCounts[user.id] || 0,
        userId: user.id,
      }))
      .sort((a, b) => b.posts - a.posts)
  }, [posts, users])

  const maxPosts = Math.max(...chartData.map((d) => d.posts), 1)

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="h-64 flex items-end justify-between gap-2 px-4 py-4">
      {chartData.map((item, index) => (
        <motion.div
          key={item.userId}
          className="flex flex-col items-center flex-1 max-w-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <div className="text-xs font-medium text-foreground mb-1">{item.posts}</div>
          <motion.div
            className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-sm min-h-4"
            initial={{ height: 0 }}
            animate={{ height: `${(item.posts / maxPosts) * 180}px` }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
          />
          <div className="text-xs text-muted-foreground mt-2 text-center truncate w-full">{item.name}</div>
        </motion.div>
      ))}
    </div>
  )
}
