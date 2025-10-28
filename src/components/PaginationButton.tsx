import { Link } from "react-router-dom"

interface PaginationButtonProps {
  isActive?: boolean
  page: number
  photosPerPage: number
}

export default function PaginationButton({
  isActive = false,
  page,
  photosPerPage
}: PaginationButtonProps) {
  return (
    <Link key={page}
      to={`?page=${page}&limit=${photosPerPage}`}
      className={`
        border border-black rounded-md cursor-pointer px-2
        ${isActive ? "bg-gray-700 text-white" : ""}
      `}
    >
      {page}
    </Link>
  )
}
