import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

export default function Header() {
  const location = useLocation()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    if (isDark) {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
    setIsDark(!isDark)
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow px-6 py-4 flex justify-between items-center mb-6">
      <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        🎥 КиноПортал
      </Link>

      <nav className="flex gap-6 items-center">
        <Link
          to="/"
          className={`hover:underline ${location.pathname === '/' ? 'font-bold underline' : ''}`}
        >
          Главная
        </Link>
        <Link
          to="/favorites"
          className={`hover:underline ${location.pathname === '/favorites' ? 'font-bold underline' : ''}`}
        >
          Избранное
        </Link>

        <button onClick={toggleTheme} className="ml-4 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
      </nav>
    </header>
  )
}