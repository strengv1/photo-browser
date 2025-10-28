import { Link } from "react-router-dom"
import type { Photo } from "../lib/types"

interface PhotoGalleryProps {
  photos: Photo[]
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 place-items-center">
      {(photos.length > 0) ?
          photos.map((p, idx) => (
            <Link key={idx} to={`/image/${p.id}`}>
              <img
                src={p.thumbnailUrl}
                alt={p.id.toString()}
              />
            </Link>
          ))
        :
        <div >No Photos To Show</div>
      }
    </div>
  )
}