"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import MovieForm from "@/components/MovieForm"
import { getMovie, updateMovie } from "@/api/movies"
import { Movie } from "@/types/movie"

export default function EditMoviePage() {
  const router = useRouter()
  const params = useParams()
  const rawId = params?.id
  const id = Array.isArray(rawId) ? rawId[0] : rawId

  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError("ID inválido")
      setLoading(false)
      return
    }

    const movieId = id

    async function loadMovie() {
      try {
        const data = await getMovie(movieId)
        setMovie(data)
      } catch (err) {
        setError("Não foi possível carregar o filme")
      } finally {
        setLoading(false)
      }
    }

    loadMovie()
  }, [id])

  async function handleSubmit(updatedMovie: Movie) {
    if (!id) return
    const movieId = id
    await updateMovie(movieId, updatedMovie)
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Editar Filme</h1>
      {loading ? (
        <p>Carregando filme...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : movie ? (
        <MovieForm movie={movie} onSubmit={handleSubmit} />
      ) : (
        <p>Filme não encontrado.</p>
      )}
    </main>
  )
}
