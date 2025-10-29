import { useState, useEffect } from 'react'
import type { Album, User } from '../lib/types'
import { fetchUser } from '../services/userService'
import { fetchUserAlbums } from '../services/albumService'

export function useUser(userId: number) {
  const [user, setUser] = useState<User | null>(null)
  const [albums, setAlbums] = useState<Album[]>([])
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (!userId) return
    const controller = new AbortController()

    const loadUser = async () => {
      setIsFetching(true)
      try {
        const [userData, albumsData] = await Promise.all([
          fetchUser(userId, controller.signal),
          fetchUserAlbums(userId, controller.signal)
        ])
                
        setUser(userData)
        setAlbums(albumsData)
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setIsFetching(false)
      }
    }
    
    loadUser()

    return () => controller.abort()
  }, [userId])
  
  return { user, albums, isFetching, error }
}