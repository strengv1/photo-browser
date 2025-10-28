import Button from "./Button"

interface PaginationButtonProps {
  isActive?: boolean
  page: number
  handleClick: () => void
}

const PaginationButton = ({
  isActive = false,
  page,
  handleClick
}: PaginationButtonProps) => (
  <Button
    key={page}
    className={`${isActive ? "bg-gray-700 text-white" : ""}`}
    onClick={handleClick}
  >
    {page}
  </Button>
)

interface PaginationProps {
  currentPage: number
  goToPage: (page: number) => void
  photosPerPage: number
  setPhotosPerPage: (newCount: number) => void
}

export default function PaginationButtons({
  currentPage,
  goToPage,
  photosPerPage,
  setPhotosPerPage
}: PaginationProps) {
  
  const renderPaginationLinks = () => {
    const links = []
    
    links.push(
      <Button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        {`< `}
        <span className="hidden md:inline-block">Previous</span>
      </Button>
    )
    // Always show first page
    links.push(
      <PaginationButton isActive={currentPage===1} page={1} handleClick={() => goToPage(1)} />
    )
    
    if (currentPage > 2) {
      links.push(
        <button key="ellipsis_left">...</button>
      )
    }
    
    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= currentPage + 1; i++) {
      if (i === 1) continue
      links.push(
        <PaginationButton isActive={currentPage === i} page={i} handleClick={() => goToPage(i)} />
      )
    }
    
    links.push(
      <button key="ellipsis_right">...</button>
    )

    links.push(
      <Button
        onClick={() => goToPage(currentPage + 1)}
      >
        <span className="hidden md:inline-block">Next</span>
        {` >`}
      </Button>
    )
    return links
  }

  return (
    <div className="flex flex-col md:flex-row my-8 gap-2 items-center justify-center">
      <div className="flex gap-2 items-center">
        <span className="text-sm hidden sm:inline-block ">
          Show
        </span>
        <select
          value={photosPerPage}
          onChange={(e) => {
            setPhotosPerPage(Number(e.target.value))
            goToPage(1)
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

      <div className="flex gap-2 mx-auto">
        {renderPaginationLinks()}
      </div>
    </div>
  )
}