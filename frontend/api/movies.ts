const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getMovies() {
  const res = await fetch(`${API_URL}/movies`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export async function createMovie(movie: any) {
  const res = await fetch(`${API_URL}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error("Failed to create movie");
}

export async function updateMovie(id: number, movie: any) {
  const res = await fetch(`${API_URL}/movies/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error("Failed to update movie");
}

export async function deleteMovie(id: number) {
  const res = await fetch(`${API_URL}/movies/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete movie");
}