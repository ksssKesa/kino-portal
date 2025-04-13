import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MoviePage from './pages/MoviePage'
import Favorites from './pages/Favorites'
import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<div className="p-8 text-center text-2xl">404 – Страница не найдена</div>} />
      </Routes>
    </div>
  )
}

export default App