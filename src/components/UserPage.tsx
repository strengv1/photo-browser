import { useParams } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import type { Album } from '../lib/types'

export default function UserPage() {
  const { userId } = useParams()
  if (!userId) return null

  const { user, albums, isFetching, error } = useUser(parseInt(userId, 10))

  return (
    <div>
      {error && <p className="text-red-600">Error: {error}</p>}
      
      {isFetching || !user ? (
       <div className="animate-pulse flex flex-col items-center" aria-hidden="true">
          <div className="h-7 w-48 bg-gray-300 mb-4" />
          <div className="h-4 w-64 bg-gray-300 mb-2" />
          <div className="h-4 w-52 bg-gray-300" />
        </div>
      ) : (
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
      )}
    </div>
  )
}