import { useNavigate, Outlet } from 'react-router-dom'

export default function DetailLayout() {
  const navigate = useNavigate()
  
  return (
    <>
      <div className="w-full flex mb-4">
        <button
          className="border border-black rounded px-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <Outlet />
    </>
  )
}