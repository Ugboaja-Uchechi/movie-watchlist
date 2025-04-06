import React from 'react'
import axios from 'axios';
import Link from 'next/link';

export default async function MovieDetail({ params }) {
  const { id } = params;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const movieResponse = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
  const movie = movieResponse.data;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="w-full max-h-[400px] h-full rounded-lg object-contain mt-4"
      />
      <div className='flex items-center justify-between'>
        <div className='flex-2'>
          <h1 className="text-2xl font-bold text-center">{movie.title}</h1>
          <p className="mt-4 text-gray-800">{movie.overview}</p>
          <p className="mt-2 font-semibold">Rating: {movie.vote_average}</p>
        </div>
        <div className="flex-1 text-center">
          <Link href={`/watch/${id}`}>
            <button className="bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Watch Now
            </button>
          </Link>
        </div>
      </div>



      
    </div>
  )
}

