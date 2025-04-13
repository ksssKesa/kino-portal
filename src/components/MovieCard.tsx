import React from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../store/useFavorites'

type Movie = {
  id: number
  title: string
  poster: string
  rating: number
  year: number
  genre: string[]
}

interface Props {
  movie: Movie
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const isFav = isFavorite(movie.id)

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:scale-[1.02] transition">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-72 object-cover"
        />
      </Link>
      <div className="p-4">
        <h2 className="text-xl font-bold">{movie.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{movie.year}</p>
        <p className="text-sm text-yellow-500 font-semibold">⭐ {movie.rating}</p>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {movie.genre.join(', ')}
        </div>

        <button
          onClick={() => isFav ? removeFavorite(movie.id) : addFavorite(movie)}
          className={`mt-4 block w-full px-3 py-2 rounded text-sm font-medium transition ${
            isFav
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
          }`}
        >
          {isFav ? 'Удалить из избранного ❤️' : 'Добавить в избранное 🤍'}
        </button>
      </div>
    </div>
  )
}

export default MovieCard