"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  // const API_KEY = process.env.NEXT_TMDB_API_KEY;
  // const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
  // const data = await response.data.results;
  // console.log("hello", data);


  const [movies, setMovies] = useState([]);
  // updates when a user types in the search bar
  const [searchMovies, setSearchMovies] = useState("");
  // state to store the filtered movies
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        const data = response.data.results;
        setMovies(data);
        setFilteredMovies(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleInputChange = (e: any) => {
    const searchTerm = e.target.value;
    setSearchMovies(searchTerm);

    //only filter if we have a search term
    if (searchTerm) {
      // Filter movies based on the search term
      const filteredItems = movies.filter((movie: { title: string }) =>
        movie?.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredMovies(filteredItems);
    } else {
      // If search is empty, show all movies
      setFilteredMovies(movies);
    }

  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="font-[family-name:var(--font-geist-sans)] px-16">
      <div className="flex justify-end">
        <input type="text" value={searchMovies} onChange={handleInputChange} placeholder="Search movies" className="border border-amber-100 rounded-md p-2" />
      </div>
      <h1>Trending Movies</h1>

      <div className="">
         {/* renders the filtered movies instead of data variable */}
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-10">
          {filteredMovies.map((movie: any) => (
            <Link href={`/movie/${movie?.id}`} key={movie?.id}>
              <li>
                <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="" />
                <h2>{movie?.title}</h2>
              </li>
            </Link>

          ))}
        </ul>
      </div>
    </div>
  );
}
