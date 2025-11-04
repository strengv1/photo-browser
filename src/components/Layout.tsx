import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="container mx-auto min-h-dvh flex flex-col">
      <header className="my-6">
        <h1 className="text-lg font-bold">Photo Browser</h1>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="my-8 text-sm text-gray-600">
        My Photo Browser App
      </footer>
    </div>
  )
}