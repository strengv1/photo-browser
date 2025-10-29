import { useSearchParams } from "react-router-dom";

export const allowedLimits = [10, 20, 50, 100]

export default function ShowPerPageSelect() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const photosPerPage = Number(searchParams.get("limit")) || 20;

  return (
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
        {allowedLimits.map((lim) => (
          <option value={lim}>{lim}</option>
        ))}
      </select>

      <span className="text-xs sm:text-sm">
        per page
      </span>
    </div>
  )
}