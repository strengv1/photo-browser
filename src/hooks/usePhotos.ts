import { useEffect, useState } from "react"
import type { Photo } from "../lib/types"
import { fetchPhotos } from "../services/photoService"

export function usePhotos(page: number, limit: number) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadPhotos = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchPhotos(page, limit, controller.signal)
        setPhotos(data)
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setIsLoading(false)
      }
    };

    loadPhotos()
    return () => controller.abort()
  }, [page, limit])

  return { photos, isLoading, error }
}