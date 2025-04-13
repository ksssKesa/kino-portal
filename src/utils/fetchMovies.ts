import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { Movie } from '../store/useFavorites'

export const fetchMovies = async (): Promise<Movie[]> => {
  const snapshot = await getDocs(collection(db, 'movies'))
  return snapshot.docs.map((doc) => doc.data() as Movie)
}