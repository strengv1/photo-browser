
import { useState } from "react"
import { Link } from "react-router-dom"
import type { Photo } from "../lib/types"

interface PhotoCardProps {
  photo: Photo
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link
      to={`/image/${photo.id}`}
      className="relative w-full aspect-square rounded"
    >
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={photo.thumbnailUrl}
        alt={photo.id.toString()}
        className={`w-full rounded transition-opacity duration-100 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
      />
    </Link>
  )
}