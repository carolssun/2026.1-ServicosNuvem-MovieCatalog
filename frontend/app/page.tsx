"use client"

import { useEffect, useState } from "react"
import { getMovies, deleteMovie } from "@/api/movies"
import MovieCarousel from "@/components/MovieCaroussel"
import { Movie } from "@/types/movie"

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setIsLoading(true)
    const data = await getMovies()
    console.log("MOVIES:", data)
    setMovies(data)
    setIsLoading(false)
  }

  async function handleDelete(id: number) {
    await deleteMovie(id)
    await load()
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      
      <div className="w-full flex justify-center pt-10 pb-6">
        <h1 className="text-3xl font-bold">
          Catálogo
        </h1>
      </div>

      <MovieCarousel movies={movies} onDelete={handleDelete} isLoading={isLoading} />

    </main>
  )
}