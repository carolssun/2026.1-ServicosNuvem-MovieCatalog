import Link from "next/link"
import { Movie } from "@/types/movie"

interface Props {
  movie: Movie
  onDelete?: (id: string | number) => void
}

export default function MovieCard({ movie, onDelete }: Props) {
  return (
    <div className="min-w-[220px] bg-zinc-900 rounded-xl overflow-hidden shadow-lg">
      <img
        src={movie.poster}
        alt={movie.title}
        className="h-64 w-full object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="font-semibold truncate">{movie.title}</h3>
        <p className="text-sm text-zinc-400">{movie.genre}</p>
        <p className="text-xs text-zinc-500">
          {movie.duration} min · {movie.ageRating}
        </p>

        <div className="mt-2 flex flex-wrap gap-3">
          {movie.id && (
            <Link
              href={`/movies/${movie.id}/edit`}
              className="text-xs text-indigo-400 hover:text-indigo-300"
            >
              Editar
            </Link>
          )}
          {onDelete && movie.id && (
            <button
              onClick={() => onDelete(movie.id!)}
              className="text-xs text-red-400 hover:text-red-500"
            >
              Remover
            </button>
          )}
        </div>
      </div>
    </div>
  )
}