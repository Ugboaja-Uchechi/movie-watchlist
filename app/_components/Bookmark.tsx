"use client";

import React, { useEffect, useState } from 'react';

interface BookmarkProps {
  movieId: number;
  title: string;
}

export default function Bookmark({ movieId, title }: BookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check if the movie is already bookmarked when component mounts
  useEffect(() => {
    const addToWatchList = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await fetch(`https://api.themoviedb.org/3/account/{account_id}/watchlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            media_id: movieId
          }),
        });
      } catch (error) {
        console.error('Error adding movie to watchlist:', error);
      }
    }
    addToWatchList();
  }, [movieId]);

  const handleBookmark = () => {
    // Get current bookmarked movies from localStorage
    const bookmarkedMovies = JSON.parse(localStorage.getItem('bookmarkedMovies') || '[]');

    if (isBookmarked) {
      // Remove from bookmarks
      const updatedBookmarks = bookmarkedMovies.filter((movie: any) => movie.id !== movieId);
      localStorage.setItem('bookmarkedMovies', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      // Add to bookmarks
      const movieToAdd = {
        id: movieId,
        title
      };
      localStorage.setItem('bookmarkedMovies', JSON.stringify([...bookmarkedMovies, movieToAdd]));
      setIsBookmarked(true);
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className={`px-4 py-2 rounded-md ${isBookmarked
        ? 'bg-green-500 hover:bg-green-600'
        : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
    >
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
}
