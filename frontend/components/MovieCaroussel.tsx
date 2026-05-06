"use client"

import useEmblaCarousel from "embla-carousel-react"
import MovieCard from "./MovieCard"
import { Movie } from "@/types/movie"
import Link from "next/link"

interface Props {
  movies: Movie[]
  onDelete?: (id: number) => void
}

export default function MovieCarousel({ movies, onDelete }: Props) {
  const [emblaRef] = useEmblaCarousel({ align: "start", dragFree: true })

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-6">
        {/* ADD CARD */}
        <Link
          href="/movies/new"
          className="min-w-[220px] h-[360px]
                     flex flex-col items-center justify-center
                     border-2 border-dashed border-zinc-600
                     rounded-xl text-zinc-400
                     hover:border-indigo-500 hover:text-indigo-400 transition"
        >
          <span className="text-5xl font-bold">+</span>
          <span className="mt-2">Adicionar Filme</span>
        </Link>

        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}