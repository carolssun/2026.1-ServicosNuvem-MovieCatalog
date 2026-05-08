"use client"

import { useEffect, useState } from "react"
import { getMovies, deleteMovie } from "@/api/movies"
import MovieCarousel from "@/components/MovieCaroussel"
import { Movie } from "@/types/movie"

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const data = await getMovies()
    console.log("MOVIES:", data)
    setMovies(data)
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

      <MovieCarousel movies={movies} onDelete={handleDelete} />

    </main>
  )
}