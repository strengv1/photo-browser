import { useEffect, useState } from 'react'
import './App.css'

interface Photo {
  albumId: number
  id: number
  thumbnailUrl: string
  title: string
  url: string
}

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [photosPerPage, setPhotosPerPage] = useState(20)
  const [visiblePhotos, setVisiblePhotos] = useState<Photo[]>([])

  const fetchPhotos = async (page: number, limit: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`);

    if (!res.ok) {
      setVisiblePhotos([])
      return null
    }

    const photos: Photo[] = await res.json();

    // Replace the broken URLs with Picsum ones
    return photos.map((p) => ({
      ...p,
      thumbnailUrl: `https://picsum.photos/seed/${p.id}/150/150`,
      url: `https://picsum.photos/seed/${p.id}/600/400`,
    }));
  };

  useEffect(() => {
    const loadPhotos = async () => {
      const photos = await fetchPhotos(currentPage, photosPerPage);
      setVisiblePhotos(photos ?? []);
    };

    loadPhotos();
  }, [currentPage, photosPerPage])

  return (
    <div className="container">
      <h1>Photo Browser</h1>

      {/* Page selector */}
      <div className="flex gap-2 items-center">
        <span className="text-sm hidden sm:inline-block ">
          Show
        </span>
        <select
          value={photosPerPage}
          onChange={(e) => {
            setPhotosPerPage(Number(e.target.value))
            setCurrentPage(1)
          }}
          className="h-8 px-2 py-1 rounded-md border text-sm "
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span className="text-xs sm:text-sm">
          per page
        </span>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-3 gap-4">
        {(visiblePhotos.length > 0) ?
            visiblePhotos.map((photo, idx) => (
              <img key={idx}
                src={photo.thumbnailUrl}
                alt={photo.id.toString()}
              />
            ))

          :
          <div>error</div>
        }
      </div>

    </div>
  )
}

export default App
