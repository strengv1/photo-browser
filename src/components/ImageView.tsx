import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import { usePhoto } from "../hooks/usePhoto"

export default function ImageView() {
  const { id } = useParams()
  const { photo, isFetching, error } = usePhoto(id)
  const [imgLoaded, setImgLoaded] = useState(false)

  if (!id) return null

  return (
    <div className="container">
      <div className="w-full flex">
        <Link to="/" className="text-blue-700 font-semibold">
          &lt; Back
        </Link>
      </div>

      {error && <p className="text-red-600">Error: {error}</p>}

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
