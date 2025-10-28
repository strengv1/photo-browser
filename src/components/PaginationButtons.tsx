import { Link, useSearchParams } from "react-router-dom"
import PaginationButton from "./PaginationButton";

export default function PaginationButtons() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const photosPerPage = Number(searchParams.get("limit")) || 20;

  const renderPaginationLinks = () => {
    const links = []
    
    if (currentPage > 1) {
      links.push(
        <Link
          key="previous"
          to={`?page=${currentPage-1}&limit=${photosPerPage}`}
        >
          {`< `}
          <span className="hidden md:inline-block">Previous</span>
        </Link>
      )
    }

    links.push(
      <PaginationButton
        key={1}
        isActive={currentPage===1}
        page={1}
        photosPerPage={photosPerPage}
      />
    )
    
    if (currentPage > 2) {
      links.push(
        <span key="ellipsis_left">...</span>
      )
    }
    
    for (let i = Math.max(2, currentPage - 1); i <= currentPage + 1; i++) {
      if (i === 1) continue
      links.push(
        <PaginationButton
          key={i}
          isActive={currentPage === i}
          page={i}
          photosPerPage={photosPerPage}
        />
      )
    }
    
    links.push(
      <span key="ellipsis_right">...</span>
    )

    links.push(
      <Link key="next" to={`?page=${currentPage+1}&limit=${photosPerPage}`}>
        <span className="hidden md:inline-block">Next</span>
        {` >`}
      </Link>
      
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
            const newLimit = Number(e.target.value);
            setSearchParams({
              page: "1",
              limit: newLimit.toString()
            });
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