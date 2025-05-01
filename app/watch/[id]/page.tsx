
import React from 'react';
import axios from 'axios';

export default async function WatchMovie({ params }: { params: { id: string } }) {
  const { id } = params;
  const embedUrl = `https://vidsrc.icu/embed/movie/${id}`;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
  const movie = response.data;
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
      <div className="w-full max-w-4xl">
        <iframe
          className="w-full h-[500px] border-none rounded-lg"
          allowFullScreen
          src={embedUrl}
        ></iframe>
      </div>
    </div>
  );
}