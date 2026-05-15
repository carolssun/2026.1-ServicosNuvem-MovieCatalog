"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Movie } from "@/types/movie"

interface Props {
  movie?: Movie
  onSubmit: (movie: Movie) => Promise<void>
}

export default function MovieForm({ movie: initialMovie, onSubmit }: Props) {
  const router = useRouter()

  const [movie, setMovie] = useState<Movie>(
    initialMovie ?? {
      title: "",
      poster: "",
      genre: "",
      summary: "",
      releaseDate: "",
      duration: 0,
      ageRating: "",
      direction: "",
      departureDate: "",
    }
  )

  useEffect(() => {
    if (initialMovie) {
      setMovie(initialMovie)
    }
  }, [initialMovie])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target

    setMovie(prev => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    } as Movie))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      await onSubmit(movie)
      router.push("/")
    } catch (error) {
      console.error("Erro ao salvar filme:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      {[
        ["title", "Título"],
        ["poster", "Poster (URL)"],
        ["genre", "Gênero"],
        ["ageRating", "Classificação"],
        ["direction", "Direção"],
      ].map(([name, label]) => (
        <input
          key={name}
          name={name}
          value={(movie as any)[name] ?? ""}
          placeholder={label}
          className="w-full p-2 rounded bg-zinc-800 text-white"
          onChange={handleChange}
        />
      ))}

      <textarea
        name="summary"
        value={movie.summary}
        placeholder="Resumo"
        className="w-full p-2 rounded bg-zinc-800 text-white"
        onChange={handleChange}
      />

      <div className="flex gap-4">
        <input
          type="date"
          name="releaseDate"
          value={movie.releaseDate}
          className="p-2 rounded bg-zinc-800 text-white w-full"
          onChange={handleChange}
        />
        <input
          type="date"
          name="departureDate"
          value={movie.departureDate}
          className="p-2 rounded bg-zinc-800 text-white w-full"
          onChange={handleChange}
        />
      </div>

      <input
        type="number"
        name="duration"
        value={movie.duration}
        placeholder="Duração (min)"
        className="w-full p-2 rounded bg-zinc-800 text-white"
        onChange={handleChange}
      />

      <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  )
}