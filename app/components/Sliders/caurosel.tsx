'use client'
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { IMAGE_BASE_URL } from "@/app/config";


interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

const Carousels = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=8644a1c8f15817cdc93d07d6ccdc34fb")
      .then(res => res.json())
      .then(data => setPopularMovies(data.results))
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="text-white py-4 bg-black">
      <div className="w-full">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          interval={3000}
          infiniteLoop={true}
          showStatus={false}
          className="carousel"
          emulateTouch={true} 
        >
          {popularMovies.map(movie => (
            <div className="carousel-item" key={movie.id}>
              <div className="relative h-screen">
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full"
                />
                <div className="carousel-content absolute left-0 right-0 bottom-5 p-4 ">
                  <h2 className="text-2xl font-semibold text-white">{movie.title}</h2>
                  <p className="text-gray-400">{movie.release_date}</p>
                  <p className="mt-2 text-gray-200">{movie.overview}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Carousels;
