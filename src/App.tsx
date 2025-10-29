import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import './App.css'
import PaginationButtons from './components/PaginationButtons'
import PhotoGallery from './components/PhotoGallery'
import { usePhotos } from "./hooks/usePhotos"
import { allowedLimits } from './components/ShowPerPageSelect'

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const limitParams = Number(searchParams.get("limit")) || 20;
  const photosPerPage = allowedLimits.includes(limitParams) ? limitParams : 20
  
  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
      limit: photosPerPage.toString()
    }, { replace: true });
  
  }, []);
  
  const { photos, isLoadingMetadata, error } = usePhotos(currentPage, photosPerPage);
  
  return (
    <>
      <PaginationButtons />
      
      {error && <p className="text-red-600">{error}</p>}
      
      {isLoadingMetadata ? (
        <PhotoGallery photos={[]} isLoading={true} expectedPhotoCount={photosPerPage}/>
      ) : (
        <PhotoGallery photos={photos} isLoading={false}/>
      )}
      
      <PaginationButtons />
    </>
  )
}

export default App