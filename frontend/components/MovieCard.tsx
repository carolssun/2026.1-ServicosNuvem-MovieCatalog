import { Movie } from "@/types/movie"

interface Props {
  movie: Movie
  onDelete?: (id: number) => void
}

export default function MovieCard({ movie, onDelete }: Props) {
  return (
    <div className="min-w-[220px] bg-zinc-900 rounded-xl overflow-hidden shadow-lg">
      <img
        src={movie.poster}
        alt={movie.title}
        className="h-64 w-full object-cover"
      />

      <div className="p-4 space-y-1">
        <h3 className="font-semibold truncate">{movie.title}</h3>
        <p className="text-sm text-zinc-400">{movie.genre}</p>
        <p className="text-xs text-zinc-500">
          {movie.duration} min · {movie.ageRating}
        </p>

        {onDelete && movie.id && (
          <button
            onClick={() => onDelete(movie.id!)}
            className="mt-2 text-xs text-red-400 hover:text-red-500"
          >
            Remover
          </button>
        )}
      </div>
    </div>
  )
}