import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom"
import { useState } from "react"
import { usePhoto } from "../hooks/usePhoto"

export default function ImageView() {
  const navigate = useNavigate();

  const { id } = useParams()
  const { photo, album, user, isFetching, error } = usePhoto(id)
  const [imgLoaded, setImgLoaded] = useState(false)

  if (!id) return null
  
  return (
    <div className="container">
      <div className="w-full flex">
        <button
          className="border border-black rounded px-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      {error && <p className="text-red-600">Error: {error}</p>}

      <div>
        Belongs to album: {album?.title}
        <br />
        Which belongs to user: {user?.name}
      </div>

      <div className="flex items-center justify-center">
        {isFetching || !photo ? (
          <div className="h-[400px] w-[600px] animate-pulse bg-gray-300" />
        ) : (
          <div className="relative h-[400px] w-[600px]">
            {!imgLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gray-300" />
            )}

            <img
              alt={photo.title || "image"}
              src={photo.url}
              height={400}
              width={600}
              className={`transition-opacity duration-500 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
