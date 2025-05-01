"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Bookmark from "./_components/Bookmark";

export default function Home() {

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
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`);
        const data = response.data.results;
        console.log(data)
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
      <h1 className="text-center font-medium text-[calc(1.5rem_+_2vw)] my-10">Trending Movies</h1>

      <div className="">
        {/* renders the filtered movies instead of data variable */}
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-10">
          {filteredMovies.map((movie: any) => (
            <div key={movie?.id}>
              <Link href={`/movie/${movie?.id}`}>
                <li>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt={movie?.title} className=" max-w-[320px] w-full max-h-[390px] h-full rounded-lg object-cover" />
                  <h2>{movie?.title}</h2>
                  <div className="flex items-center gap-4">
                    <p>{movie?.vote_average.toFixed(1)}</p>
                    <div>
                      <hr className="border-2 w-12" />
                    </div>
                    <p>{movie?.release_date.slice(0, 4)}</p>
                  </div>
                </li>
              </Link>
              <div>
                <Bookmark movieId={movie?.id} title={movie?.title} />
              </div>
            </div>


          ))}
        </ul>
      </div>
    </div>
  );
}
