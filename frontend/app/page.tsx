import { getMovies, deleteMovie } from "@/api/movies"
import MovieCarousel from "@/components/MovieCaroussel"

export default async function Home() {
  const movies = await getMovies()

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Catálogo</h1>

      <MovieCarousel
        movies={movies}
        onDelete={async (id) => {
          "use server"
          await deleteMovie(id)
        }}
      />
    </main>
  )
}