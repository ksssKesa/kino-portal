import { useFavorites } from '../store/useFavorites'
import MovieCard from '../components/MovieCard'

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-4">❤️ Избранные фильмы</h1>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">Нет избранных фильмов</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}