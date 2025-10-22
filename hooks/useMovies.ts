import { useState } from "react";
import { API_KEY } from "../constants/api";

export default function useMovies() {
  const [results, setResults] = useState<any[]>([]);

  const searchMovies = async (query: string) => {
    const res = await fetch(`/search/movie?query=${query}&api_key=${API_KEY}`);
    const data = await res.json();
    setResults(data.results || []);
  };

  return { results, searchMovies };
}
