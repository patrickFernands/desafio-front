import { request } from "./api";

export async function getMovies() {
  const response = await request("/movies");
  return response.data;
}
