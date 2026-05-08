"use client"

import useEmblaCarousel from "embla-carousel-react"
import MovieCard from "./MovieCard"
import { Movie } from "@/types/movie"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Props {
  movies: Movie[]
  onDelete?: (id: number) => void
}

export default function MovieCarousel({ movies, onDelete }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  })

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <div className="relative w-full">

      {/* LEFT */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2
                   h-12 w-12 rounded-full bg-white
                   flex items-center justify-center shadow-md z-10"
      >
        <ChevronLeft size={24} className="text-zinc-800" />
      </button>

      {/* VIEWPORT */}
      <div
        ref={emblaRef}
        className="
          overflow-hidden w-full
          pl-4 pr-20
        "
      >

        {/* TRACK */}
        <div className="flex gap-6">

          {/* ADD CARD */}
          <Link
            href="/movies/new"
            className="
              flex-[0_0_auto]
              w-[220px] sm:w-[240px] lg:w-[260px]
              h-[360px]

              flex flex-col items-center justify-center
              border-2 border-dashed border-zinc-600
              rounded-xl text-zinc-400
              hover:border-indigo-500 hover:text-indigo-400
              transition
            "
          >
            <span className="text-5xl font-bold">+</span>
            <span className="mt-2">Adicionar Filme</span>
          </Link>

          {/* MOVIES */}
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="
                flex-[0_0_auto]
                w-[220px] sm:w-[240px] lg:w-[260px]
              "
            >
              <MovieCard movie={movie} onDelete={onDelete} />
            </div>
          ))}

        </div>
      </div>

      {/* RIGHT */}
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2
                   h-12 w-12 rounded-full bg-white
                   flex items-center justify-center shadow-md z-10"
      >
        <ChevronRight size={24} className="text-zinc-800" />
      </button>

    </div>
  )
}