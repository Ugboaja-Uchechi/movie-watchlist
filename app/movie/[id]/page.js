"use client"

import React, { useEffect, useState, use } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function MovieDetail({ params }) {
  const { id } = use(params);
  const [movieDetail, setMovieDetail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const movieResponse  = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const movie = movieResponse.data;
        setMovieDetail(movie);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
    fetchMovie();
  }, []);

  const handleWatch = () => {
    console.log("Navigating to watch:", id);
    router.push(`/watch/${id}`);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`}
        className="w-full max-h-[400px] h-full rounded-lg object-contain mt-4"
      />
      <div className='flex items-center justify-between'>
        <div className='flex-2'>
          <h1 className="text-2xl font-bold text-center">{movieDetail?.title}</h1>
          <p className="mt-4 text-gray-800">{movieDetail?.overview}</p>
          <p className="mt-2 font-semibold">Rating: {movieDetail?.vote_average}</p>
        </div>
        <div className="flex-1 text-center">
  
            <button className="bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleWatch}>
              Watch Now
            </button>
        </div>
      </div>



      
    </div>
  )

}
