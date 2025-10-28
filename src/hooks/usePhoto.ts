import { useEffect, useState } from "react"
import type { Photo } from "../lib/types"
import { fetchSinglePhoto } from "../services/photoService"

export function usePhoto(id?: string) {
  const [photo, setPhoto] = useState<Photo | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const controller = new AbortController()

    const loadPhoto = async () => {
      setIsFetching(true)
      setError(null)

      try {
        const data = await fetchSinglePhoto(id, controller.signal)
        setPhoto(data)
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setIsFetching(false)
      }
    };

    loadPhoto()
    return () => controller.abort()
  }, [id])

  return { photo, isFetching, error }
}
