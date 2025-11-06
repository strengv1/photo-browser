import { useParams } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import type { Album } from '../lib/types'

export default function UserPage() {
  const { userId } = useParams()
  const parsedId = userId ? parseInt(userId, 10) : undefined

  const { user, albums, isFetching, error } = useUser(parsedId)

  if (!userId) {
    return <p className="text-gray-500">No user selected.</p>
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>
  }

  if (isFetching || !user) {
    return (
      <div className="animate-pulse flex flex-col items-center" aria-hidden="true">
        <div className="h-7 w-48 bg-gray-300 mb-4" />
        <div className="h-4 w-64 bg-gray-300 mb-2" />
        <div className="h-4 w-52 bg-gray-300" />
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">Albums</h3>
      <div className="grid gap-4">
        {albums?.map((album: Album) => (
          <div key={album.id} className="border p-4 rounded-lg">
            <h4 className="font-medium">{album.title}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}