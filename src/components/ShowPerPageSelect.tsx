import { useSearchParams } from "react-router-dom";
import { useId } from "react";
import { allowedLimits } from "../lib/types";

export default function ShowPerPageSelect() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const photosPerPage = Number(searchParams.get("limit")) || 20;
  const id = useId();
  
  return (
    <div className="flex items-center gap-1 text-sm">
      <label htmlFor={id}>
        Show
      </label>
      <select
        id={id}
        value={photosPerPage}
        onChange={(e) => {
          const newLimit = Number(e.target.value);
          setSearchParams({
            page: "1",
            limit: newLimit.toString()
          });
        }}
        className="h-8 px-2 py-1 rounded-lg border bg-white"
      >
        {allowedLimits.map((lim) => (
          <option key={lim} value={lim}>{lim}</option>
        ))}
      </select>
      <span className="text-xs sm:text-sm">
        per page
      </span>
    </div>
  )
}