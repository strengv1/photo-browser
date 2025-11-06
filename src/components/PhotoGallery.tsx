import type { Photo } from "../lib/types"
import PhotoCard from "./PhotoCard"

interface PhotoGallerySkeletonProps {
  expectedPhotoCount: number
}

function PhotoGallerySkeleton({ expectedPhotoCount }: PhotoGallerySkeletonProps) {
  return (
    <>
      {Array.from({ length: expectedPhotoCount }).map((_, idx) => (
        <div
          key={idx}
          className="w-full aspect-square rounded-lg bg-gray-200 animate-pulse"
          aria-hidden="true"
        />
      ))}
    </>
  )
}

interface PhotoGalleryProps {
  photos: Photo[]
  isLoading?: boolean
  expectedPhotoCount?: number
}

export default function PhotoGallery({ photos, isLoading = false, expectedPhotoCount = 10 }: PhotoGalleryProps) {
  const gridClasses = "grid grid-cols-[repeat(auto-fill,150px)] gap-4 md:gap-6 place-items-center justify-center"
  
  if (isLoading) {
    return (
      <div className={gridClasses} >
        <PhotoGallerySkeleton expectedPhotoCount={expectedPhotoCount} />
      </div>
    )
  }
  
  if (photos.length <= 0) {
    return (
      <p>No Photos Available</p>
    )
  }

  return (
    <div className={gridClasses} >
      {photos.map(
        (p, idx) => <PhotoCard key={idx} photo={p} />
      )}
    </div>
  )
}