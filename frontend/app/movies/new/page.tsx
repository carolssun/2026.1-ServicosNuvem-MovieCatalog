"use client"

import { createMovie } from "@/api/movies"
import MovieForm from "@/components/MovieForm"
import { useRouter } from "next/navigation"

export default function NewMoviePage() {
  const router = useRouter()

  async function handleSubmit(movie: any) {
    await createMovie(movie)
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Adicionar Filme</h1>
      <MovieForm onSubmit={handleSubmit} />
    </main>
  )
}