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
        key="previous"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        {`< `}
        <span className="hidden md:inline-block">Previous</span>
      </Button>
    )

    links.push(
      <PaginationButton key={1} isActive={currentPage===1} page={1} handleClick={() => goToPage(1)} />
    )
    
    if (currentPage > 2) {
      links.push(
        <button key="ellipsis_left">...</button>
      )
    }
    
    for (let i = Math.max(2, currentPage - 1); i <= currentPage + 1; i++) {
      if (i === 1) continue
      links.push(
        <PaginationButton key={i} isActive={currentPage === i} page={i} handleClick={() => goToPage(i)} />
      )
    }
    
    links.push(
      <button key="ellipsis_right">...</button>
    )

    links.push(
      <Button
        key="next"
        onClick={() => goToPage(currentPage + 1)}
      >
        <span className="hidden md:inline-block">Next</span>
        {` >`}
      </Button>
    )
    return links
  }

  return (
    <div className="relative flex flex-col gap-2 sm:gap-0 sm:flex-row my-8 items-center sm:justify-end">
      <div className="flex items-center gap-1 text-sm">
        Show
        <select
          value={photosPerPage}
          onChange={(e) => {
            setPhotosPerPage(Number(e.target.value))
            goToPage(1)
          }}
          className="h-8 px-2 py-1 rounded-md border "
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

      <div className="sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 flex gap-2">
        {renderPaginationLinks()}
      </div>
    </div>
  )
}