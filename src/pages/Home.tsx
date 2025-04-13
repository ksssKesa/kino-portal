import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import { useFilter } from '../store/useFilter'
import { fetchMovies } from '../utils/fetchMovies'
import { Movie } from '../store/useFavorites'

export default function Home() {
  const {
    query,
    selectedGenre,
    currentPage,
    setQuery,
    setGenre,
    setPage,
    resetFilters,
  } = useFilter()

  const [allMovies, setAllMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMovies().then((data) => {
      setAllMovies(data)
      setLoading(false)
    })
  }, [])

  const genres = ['Все', ...new Set(allMovies.flatMap((m) => m.genre))]

  const filtered = allMovies.filter((movie) => {
    const matchTitle = movie.title.toLowerCase().includes(query.toLowerCase())
    const matchGenre = selectedGenre === 'Все' || movie.genre.includes(selectedGenre)
    return matchTitle && matchGenre
  })

  const moviesPerPage = 8
  const start = (currentPage - 1) * moviesPerPage
  const paginated = filtered.slice(start, start + moviesPerPage)
  const totalPages = Math.ceil(filtered.length / moviesPerPage)

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Поиск и фильтры */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded shadow"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded shadow"
        >
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <button
          onClick={resetFilters}
          className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
        >
          Сбросить фильтр
        </button>
      </div>

      {/* Контент */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : paginated.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Фильмы не найдены 😢</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          {paginated.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}