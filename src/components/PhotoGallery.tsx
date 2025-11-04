import type { Photo } from "../lib/types"
import PhotoCard from "./PhotoCard"

interface PhotoGallerySkeletonProps {
  expectedPhotoCount: number
}

function PhotoGallerySkeleton({ expectedPhotoCount }: PhotoGallerySkeletonProps) {
  return (
    <>
      {Array.from({ length: expectedPhotoCount }).map((_, idx) => (
        <div key={idx} className="w-full aspect-square rounded-lg bg-gray-200 animate-pulse" />
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
  
  return (
    <div className={gridClasses} >
      {photos.length > 0 ? (
        photos.map((p, idx) => (
          <PhotoCard key={idx} photo={p} />
        ))
      ) : (
        <PhotoGallerySkeleton expectedPhotoCount={expectedPhotoCount} />
      )}
    </div>
  )
}