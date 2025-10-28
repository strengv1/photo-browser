import { useState } from 'react'
import './App.css'

import PaginationButtons from './components/PaginationButtons'
import PhotoGallery from './components/PhotoGallery'

import { usePhotos } from "./hooks/usePhotos"

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [photosPerPage, setPhotosPerPage] = useState(20)

  const { photos, isLoading, error } = usePhotos(currentPage, photosPerPage)

  return (
    <div className="container">
      <h1 className="text-lg font-bold mb-4">Photo Browser</h1>

      <PaginationButtons
        currentPage={currentPage}
        goToPage={setCurrentPage}
        photosPerPage={photosPerPage}
        setPhotosPerPage={setPhotosPerPage}
      />

      {error && <p className="text-red-600">{error}</p>}

      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <PhotoGallery photos={photos} />
      )}

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
