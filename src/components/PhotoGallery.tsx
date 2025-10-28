import type { Photo } from "../lib/types"
import PhotoCard from "./PhotoCard"

interface PhotoGalleryProps {
  photos: Photo[]
  isLoading?: boolean
  expectedPhotoCount?: number
}

export default function PhotoGallery({ photos, isLoading = false, expectedPhotoCount = 10 }: PhotoGalleryProps) {
  const gridClasses = "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 place-items-center"
  
  if (isLoading) {
    return (
      <div className={gridClasses} >
        {Array.from({ length: expectedPhotoCount }).map((_, idx) => (
          <div key={idx} className="w-[150px] h-[150px] rounded bg-gray-200 animate-pulse" />
        ))}
      </div>
    )
  }
  
  return (
    <div className={gridClasses} >
      {photos.length > 0 ? (
        photos.map((p, idx) => (
          <PhotoCard key={idx} photo={p} />
        ))
      ) : (
        <div className="col-span-2 sm:col-span-4 lg:col-span-6 text-center">No Photos To Show</div>
      )}
    </div>
  )
}