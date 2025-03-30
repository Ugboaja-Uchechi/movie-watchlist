import axios from "axios";

export default async function Home() {
  const API_KEY = process.env.NEXT_TMDB_API_KEY;
  const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
  const data = await response.data.results;
  console.log("hello", data);
  // const movies = await fetch();
  // const data = await movies.json();
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <h1>Trending Movies</h1>

      <div>
        <ul>
          {data.map((movie: any) => (
            <li key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
