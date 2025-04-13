import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useFavorites, Movie } from '../store/useFavorites'

// временно можно использовать тот же mockMovies из Home
import { mockMovies } from '../mockData'

export default function MoviePage() {
  const { id } = useParams()
  const movieId = parseInt(id || '0', 10)
  const [movie, setMovie] = useState<Movie | null>(null)

  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  useEffect(() => {
    const found = mockMovies.find((m) => m.id === movieId)
    setMovie(found || null)
  }, [movieId])

  if (!movie) {
    return (
      <div className="p-8 text-center text-xl text-gray-500">
        Фильм не найден 😢
      </div>
    )
  }

  const isFav = isFavorite(movie.id)

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full md:w-1/3 rounded shadow-lg object-cover"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-2">Год: {movie.year}</p>
          <p className="text-yellow-500 font-semibold mb-2">⭐ {movie.rating}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Жанры: {movie.genre.join(', ')}
          </p>

          <button
            onClick={() =>
              isFav ? removeFavorite(movie.id) : addFavorite(movie)
            }
            className={`mt-2 px-4 py-2 rounded ${
              isFav
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-300 text-black hover:bg-gray-400 dark:bg-gray-700 dark:text-white'
            }`}
          >
            {isFav ? 'Удалить из избранного ❤️' : 'Добавить в избранное 🤍'}
          </button>
        </div>
      </div>
    </div>
  )
}