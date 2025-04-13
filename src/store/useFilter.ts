import { create } from 'zustand'

type FilterState = {
  query: string
  selectedGenre: string
  currentPage: number
  setQuery: (q: string) => void
  setGenre: (g: string) => void
  setPage: (n: number) => void
  resetFilters: () => void
}

export const useFilter = create<FilterState>((set) => ({
  query: '',
  selectedGenre: 'Все',
  currentPage: 1,

  setQuery: (query) => set({ query, currentPage: 1 }),
  setGenre: (genre) => set({ selectedGenre: genre, currentPage: 1 }),
  setPage: (page) => set({ currentPage: page }),
  resetFilters: () => set({ query: '', selectedGenre: 'Все', currentPage: 1 }),
}))