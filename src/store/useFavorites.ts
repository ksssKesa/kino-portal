import { create } from 'zustand'

export type Movie = {
  id: number
  title: string
  poster: string
  rating: number
  year: number
  genre: string[]
}

type State = {
  favorites: Movie[]
  addFavorite: (movie: Movie) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

export const useFavorites = create<State>((set, get) => ({
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),

  addFavorite: (movie) => {
    const updated = [...get().favorites, movie]
    localStorage.setItem('favorites', JSON.stringify(updated))
    set({ favorites: updated })
  },

  removeFavorite: (id) => {
    const updated = get().favorites.filter((m) => m.id !== id)
    localStorage.setItem('favorites', JSON.stringify(updated))
    set({ favorites: updated })
  },

  isFavorite: (id) => {
    return get().favorites.some((m) => m.id === id)
  }
}))