"use client"

import { useState } from "react"
import { Movie } from "@/types/movie"

interface Props {
  onSubmit: (movie: Movie) => Promise<void>
}

export default function MovieForm({ onSubmit }: Props) {
  const [movie, setMovie] = useState<Movie>({
    title: "",
    poster: "",
    genre: "",
    summary: "",
    releaseDate: "",
    duration: 0,
    ageRating: "",
    direction: "",
    departureDate: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target

    setMovie(prev => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit(movie)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl"
    >
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
          placeholder={label}
          className="w-full p-2 rounded bg-zinc-800 text-white"
          onChange={handleChange}
        />
      ))}

      <textarea
        name="summary"
        placeholder="Resumo"
        className="w-full p-2 rounded bg-zinc-800 text-white"
        onChange={handleChange}
      />

      <div className="flex gap-4">
        <input
          type="date"
          name="releaseDate"
          className="p-2 rounded bg-zinc-800 text-white w-full"
          onChange={handleChange}
        />
        <input
          type="date"
          name="departureDate"
          className="p-2 rounded bg-zinc-800 text-white w-full"
          onChange={handleChange}
        />
      </div>

      <input
        type="number"
        name="duration"
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