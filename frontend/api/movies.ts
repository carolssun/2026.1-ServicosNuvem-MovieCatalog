const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined")
}

async function handleResponse(res: Response) {
  const contentType = res.headers.get("content-type")

  const data =
    contentType?.includes("application/json")
      ? await res.json()
      : await res.text()

  if (!res.ok) {
    console.error("API Error:", data)
    throw new Error(typeof data === "string" ? data : "Request failed")
  }

  return data
}

export async function getMovies() {
  const res = await fetch(`${API_URL}/movies`)
  return handleResponse(res)
}

export async function createMovie(movie: any) {
  const res = await fetch(`${API_URL}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  })

  return handleResponse(res)
}

export async function getMovie(id: string | number) {
  const res = await fetch(`${API_URL}/movies/${id}`)
  return handleResponse(res)
}

export async function updateMovie(id: string | number, movie: any) {
  const res = await fetch(`${API_URL}/movies/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  })

  return handleResponse(res)
}

export async function deleteMovie(id: string | number) {
  const res = await fetch(`${API_URL}/movies/${id}`, {
    method: "DELETE",
  })

  return handleResponse(res)
}