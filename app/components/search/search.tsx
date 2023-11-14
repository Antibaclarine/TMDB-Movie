'use client'
import React, { SetStateAction, useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); 
  const apiKey = '8644a1c8f15817cdc93d07d6ccdc34fb';
  const imageBaseURL = 'https://image.tmdb.org/t/p/w300';

  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery) {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=1`
          );
          const data = await response.json();
          setMovies(data.results);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchQuery, apiKey]);

  return (
    <div className="p-4 bg-black text-white font-serif text-2xl">
      <h1 className="movie text-4xl text-white ml-10 -mt-20">
        M<span className="text-yellow-500 mt-[20%]">oo</span>vie
      </h1>
      <div className="items-center mt-[-2%]">
        <input
          className="ml-[25%] p-3 border border-gray-300 rounded w-[30%]  text-black"
          type="text"
          placeholder="Search for a movie"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <li key={movie.id} className="">
              <img
                className="w-full h-auto cursor-pointer"
                src={`${imageBaseURL}${movie.poster_path}`}
                alt={`${movie.title} Poster`}
                onClick={() => handleMovieClick(movie)} 
              />
            </li>
          ))}
        </ul>
      </div>
      {selectedMovie && ( 
        <div className="mt-4">
          <h2 className="text-2xl font-extrabold text-yellow-300">{selectedMovie.title}</h2>
          <img
            className="w-48 h-auto"
            src={`${imageBaseURL}${selectedMovie.poster_path}`}
            alt={`${selectedMovie.title} Poster`}
          />
          <p className="text-xl">{selectedMovie.overview}</p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;