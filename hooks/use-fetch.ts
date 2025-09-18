"use client"

import { useState, useEffect, useCallback } from "react"

interface UseFetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseFetchOptions {
  immediate?: boolean
}

export function useFetch<T>(url: string, options: UseFetchOptions = { immediate: true }) {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const fetchData = useCallback(async () => {
    if (!url) return // Don't fetch if URL is empty

    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      })
    }
  }, [url])

  useEffect(() => {
    if (options.immediate && url) {
      // Check if URL exists before fetching
      fetchData()
    }
  }, [fetchData, options.immediate, url])

  return {
    ...state,
    refetch: fetchData,
  }
}
