import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { useState } from "react"
import { usePhoto } from "../hooks/usePhoto"

export default function ImagePage() {
  const { id } = useParams()
  const { photo, album, user, isFetching, error } = usePhoto(id)
  const [imgLoaded, setImgLoaded] = useState(false)
  
  if (!id) return null
  
  return (
    <>
      {error && <p className="text-red-600">Error: {error}</p>}
      
      <div className="mb-4">
        <p>Belongs to album: {album?.title}</p>
        <p>
          Which belongs to user:{' '}
          {user ? (
            <Link 
              to={`/user/${user.id}`}
              className="text-blue-600 hover:underline"
            >
              {user.name}
            </Link>
          ) : (
            'Loading...'
          )}
        </p>
      </div>
      
      <div className="flex items-center justify-center">
        {isFetching || !photo ? (
          <div className="h-[400px] w-[600px] animate-pulse bg-gray-300" aria-hidden="true" />
        ) : (
          <div className="relative h-[400px] w-[600px]">
            {!imgLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gray-300" aria-hidden="true" />
            )}
            <img
              alt={photo.title || `Image ${photo.id}`}
              src={photo.url}
              className={`transition-opacity duration-300 rounded-lg ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
        )}
      </div>
    </>
  )
}