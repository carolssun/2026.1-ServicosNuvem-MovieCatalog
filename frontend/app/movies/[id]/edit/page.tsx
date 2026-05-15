import MovieForm from "@/components/MovieForm"
import { getMovie, updateMovie } from "@/api/movies"
import { Movie } from "@/types/movie"

interface EditMoviePageProps {
  params: { id: string }
}

export default async function EditMoviePage({ params }: EditMoviePageProps) {
  const movie = await getMovie(params.id)

  async function handleSubmit(updatedMovie: Movie) {
    return updateMovie(params.id, updatedMovie)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Editar Filme</h1>
      <MovieForm movie={movie} onSubmit={handleSubmit} />
    </main>
  )
}
