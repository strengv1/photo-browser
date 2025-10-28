import { useEffect, useState } from "react"
import type { Album, Photo, User } from "../lib/types"
import { fetchSinglePhoto } from "../services/photoService"
import { fetchAlbum } from "../services/albumService"
import { fetchUser } from "../services/userService"

export function usePhoto(id?: string) {
  const [photo, setPhoto] = useState<Photo | null>(null)
  const [album, setAlbum] = useState<Album | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const controller = new AbortController()

    const loadPhoto = async () => {
      setIsFetching(true)
      setError(null)

      try {
        const photoData = await fetchSinglePhoto(id, controller.signal)
        setPhoto(photoData)

        const albumData = await fetchAlbum(photoData.albumId, controller.signal)
        setAlbum(albumData)

        const userData = await fetchUser(albumData.userId, controller.signal)
        setUser(userData)
        
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

  return { photo, album, user, isFetching, error }
}
