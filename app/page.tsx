"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import LayoutWithSidebar from "@/components/layout-with-sidebar"
import Card, { CardHeader, CardTitle, CardContent } from "@/components/card"
import { useFetch } from "@/hooks/use-fetch"
import LoadingSpinner from "@/components/loading-spinner"
import PostsChart from "@/components/posts-chart"

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

interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

interface Album {
  id: number
  userId: number
  title: string
}

interface Photo {
  id: number
  albumId: number
  title: string
  url: string
  thumbnailUrl: string
}

interface Todo {
  id: number
  userId: number
  title: string
  completed: boolean
}

export default function DashboardHome() {
  const { data: posts, loading: postsLoading } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts")
  const { data: users, loading: usersLoading } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users")
  const { data: comments, loading: commentsLoading } = useFetch<Comment[]>(
    "https://jsonplaceholder.typicode.com/comments",
  )
  const { data: albums, loading: albumsLoading } = useFetch<Album[]>("https://jsonplaceholder.typicode.com/albums")
  const { data: photos, loading: photosLoading } = useFetch<Photo[]>("https://jsonplaceholder.typicode.com/photos")
  const { data: todos, loading: todosLoading } = useFetch<Todo[]>("https://jsonplaceholder.typicode.com/todos")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const totalPosts = posts?.length || 0
  const totalUsers = users?.length || 0
  const totalComments = comments?.length || 0
  const totalAlbums = albums?.length || 0
  const totalPhotos = photos?.length || 0
  const totalTodos = todos?.length || 0
  const completedTodos = todos?.filter((todo) => todo.completed).length || 0
  const avgPostsPerUser = totalUsers > 0 ? Math.round(totalPosts / totalUsers) : 0
  const avgCommentsPerPost = totalPosts > 0 ? Math.round(totalComments / totalPosts) : 0
  const avgPhotosPerAlbum = totalAlbums > 0 ? Math.round(totalPhotos / totalAlbums) : 0
  const todoCompletionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0
  const recentPosts = posts?.slice(0, 5) || []

  const isLoading = postsLoading || usersLoading || commentsLoading || albumsLoading || photosLoading || todosLoading

  return (
    <LayoutWithSidebar>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to Your Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive overview of all your data from JSONPlaceholder API - posts, users, comments, albums, photos,
            and todos.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={cardVariants}>
            <Card>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                  {postsLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <p className="text-2xl font-bold text-foreground">{totalPosts}</p>
                  )}
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded-sm"></div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  {usersLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
                  )}
                </div>
                <div className="w-8 h-8 bg-chart-2/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-chart-2 rounded-full"></div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Comments</p>
                  {commentsLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <p className="text-2xl font-bold text-foreground">{totalComments}</p>
                  )}
                </div>
                <div className="w-8 h-8 bg-chart-3/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-chart-3 rounded-sm transform rotate-45"></div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Albums</p>
                  {albumsLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <p className="text-2xl font-bold text-foreground">{totalAlbums}</p>
                  )}
                </div>
                <div className="w-8 h-8 bg-chart-4/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-chart-4 rounded-sm"></div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Photos</p>
                  {photosLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <p className="text-2xl font-bold text-foreground">{totalPhotos.toLocaleString()}</p>
                  )}
                </div>
                <div className="w-8 h-8 bg-chart-5/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-chart-5 rounded-full"></div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Todos</p>
                  {todosLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <p className="text-2xl font-bold text-foreground">{totalTodos}</p>
                  )}
                </div>
                <div className="w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-destructive rounded-sm"></div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Todo Completion</p>
                  {todosLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <p className="text-2xl font-bold text-foreground">{todoCompletionRate}%</p>
                  )}
                </div>
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Avg Comments/Post</p>
                  {isLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <p className="text-2xl font-bold text-foreground">{avgCommentsPerPost}</p>
                  )}
                </div>
                <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-sm transform rotate-12"></div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Platform Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Posts per User</span>
                  <span className="font-semibold">{avgPostsPerUser}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Photos per Album</span>
                  <span className="font-semibold">{avgPhotosPerAlbum}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completed Todos</span>
                  <span className="font-semibold">
                    {completedTodos} / {totalTodos}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Engagement Rate</span>
                  <span className="font-semibold">{avgCommentsPerPost} comments/post</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Posts</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "100%" }}></div>
                    </div>
                    <span className="text-sm font-medium">{totalPosts}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Comments</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-chart-2 rounded-full"
                        style={{ width: `${(totalComments / 500) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{totalComments}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Albums</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-chart-3 rounded-full"
                        style={{ width: `${(totalAlbums / 100) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{totalAlbums}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Photos</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-chart-4 rounded-full"
                        style={{ width: `${(totalPhotos / 5000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{totalPhotos.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {postsLoading ? (
                <div className="flex justify-center py-4">
                  <LoadingSpinner size="md" />
                </div>
              ) : (
                <div className="space-y-3">
                  {recentPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{post.title}</p>
                        <p className="text-xs text-muted-foreground">Post #{post.id}</p>
                      </div>
                      <Link
                        href={`/posts/${post.id}`}
                        className="text-primary hover:text-primary/80 text-sm font-medium ml-4"
                      >
                        View →
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Posts Activity by User</CardTitle>
            </CardHeader>
            <CardContent>
              <PostsChart posts={posts || []} users={users || []} loading={postsLoading || usersLoading} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  href="/posts"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-center"
                >
                  View Posts
                </Link>
                <Link
                  href="/users"
                  className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors text-center"
                >
                  Manage Users
                </Link>
            
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </LayoutWithSidebar>
  )
}
