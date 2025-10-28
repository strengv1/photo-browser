import { useEffect, useState } from 'react'
import './App.css'
import PaginationButtons from './components/PaginationButtons'

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
      <h1 className="text-lg font-bold mb-4">Photo Browser</h1>

      {/* Page Selector Top */}
      <PaginationButtons
        currentPage={currentPage}
        goToPage={setCurrentPage}
        photosPerPage={photosPerPage}
        setPhotosPerPage={setPhotosPerPage}
      />

      {/* Photo grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 place-items-center">
        {(visiblePhotos.length > 0) ?
            visiblePhotos.map((photo, idx) => (
              <img key={idx}
                src={photo.thumbnailUrl}
                alt={photo.id.toString()}
              />
            ))
          :
          <div>No Photos To Show</div>
        }
      </div>

      {/* Page selector Bottom */}
      <PaginationButtons
        currentPage={currentPage}
        goToPage={setCurrentPage}
        photosPerPage={photosPerPage}
        setPhotosPerPage={setPhotosPerPage}
      />

    </div>
  )
}

export default App
