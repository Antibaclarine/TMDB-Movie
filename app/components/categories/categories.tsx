'use client';
import React, { useState, useEffect } from 'react';
import { getMovies } from '@/app/utilities/getMovies';
import { IMAGE_BASE_URL } from '@/app/config';
import Link from 'next/link';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export interface MovieProps {
  id: number;
  title: string;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  overview: string;
}

export interface Genre {
  id: number;
  name: string;
}

export default function Categorypage() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=8644a1c8f15817cdc93d07d6ccdc34fb'
      );
      const data = await response.json();
      if (data.genres) {
        setGenres(data.genres);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMoviesByGenre = async (genreId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=8644a1c8f15817cdc93d07d6ccdc34fb&with_genres=${genreId}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenreClick = (genreId: number) => {
    fetchMoviesByGenre(genreId);
    setSelectedGenre(genreId);
    
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setSelectedGenre(null);
  };

  const handleAllClick = () => {
    setSelectedGenre(null);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setSelectedGenre(null);
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_ids.includes(selectedGenre))
    : movies;

  return (
    <main>
      <div className="bg-black">
        <Carousel responsive={{}} keyBoardControl={true} infinite={true}>
          {movies.map((movie) => (
            <div key={movie.id}>
              <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
            </div>
          ))}
        </Carousel>
        <div className="flex space-x-8 py-5 px-24 ml-28">
          <div
            onClick={handleAllClick}
            className={`cursor-pointer ${selectedGenre === null ? 'bg-yellow-500 text-white' : 'bg-slate-800 text-white'
              } rounded-3xl py-2 whitespace-nowrap px-12 font-semibold`}
          >
            All
          </div>
          {genres && genres.slice(currentIndex, currentIndex + 6).map((gen) => (
            <div
              key={gen.id}
              onClick={() => handleGenreClick(gen.id)}
              className={`cursor-pointer ${selectedGenre === gen.id ? 'bg-yellow-500 text-white' : 'bg-slate-800 text-white'
                } rounded-3xl py-2 whitespace-nowrap px-12 font-semibold`}
            >
              {gen.name}
            </div>
          ))}
          <div className="flex-shrink-0 mt-3">
            {currentIndex > 0 && (
              <IoIosArrowBack
                size={24}
                className="text-white cursor-pointer absolute left-16 -mt-1 ml-7"
                onClick={handlePrevClick}
              />
            )}
            {genres && currentIndex + 5 < genres.length && (
              <IoIosArrowForward
                size={24}
                className="text-white cursor-pointer -mt-1"
                onClick={handleNextClick}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((item) => (
              <Link href={`/movie/${item.id}`} key={item.id}>
                <div className="overflow-hidden  ">
                  <img src={`${IMAGE_BASE_URL}${item.poster_path}`} alt={item.title} />
                </div>
              </Link>
            ))
          ) : (
            <p className="text-white"></p>
          )}
        </div>
      </div>
    </main>
  );
}

// 'use client'
// import React, { useState, useEffect } from 'react';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { IMAGE_BASE_URL } from '@/app/config';
// import Link from 'next/link';
// import Slider from 'react-slick';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// type Genre = {
//   id: number;
//   name: string;
// };

// type Movie = {
//   id: number;
//   title: string;
//   poster_path: string;
//   overview: string;
//   release_date: string;
// };

// const Genres = () => {
//   const [genres, setGenres] = useState<Genre[]>([]);
//   const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [displayedMovie, setDisplayedMovie] = useState<Movie | null>();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const totalSlides = Math.ceil(genres.length / 4); // Assuming 4 slides are shown at a time

//   useEffect(() => {
//     fetchGenres();
//   }, []);

//   const fetchGenres = async () => {
//     try {
//       const response = await fetch(
//         'https://api.themoviedb.org/3/genre/movie/list?api_key=8644a1c8f15817cdc93d07d6ccdc34fb'
//       );
//       const data = await response.json();
//       setGenres(data.genres);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchMoviesByGenre = async (genreId: number) => {
//     try {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/discover/movie?api_key=8644a1c8f15817cdc93d07d6ccdc34fb&with_genres=${genreId}`
//       );
//       const data = await response.json();
//       setMovies(data.results);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const settings = {
//     infinite: true,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//     ],
//     beforeChange: (current: number, next: number) => setCurrentSlide(next),
//   };

//   const buttonStyle = {
//     width: '12px',
//     fontSize: '14px',
//   };

//   const scrollToNextSlide = () => {
//     const nextSlide = currentSlide + 1;
//     setCurrentSlide(nextSlide >= totalSlides ? 0 : nextSlide);
//   };

//   return (
//     <div className="p-4 text-white bg-black">
//       <div className="relative">
//         <Slider {...settings} initialSlide={currentSlide}>
//           {genres.map((genre) => (
//             <button
//               key={genre.id}
//               className={`bg-gray-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full ${
//                 selectedGenre === genre.id ? 'bg-yellow-600' : ''
//               }`}
//               style={buttonStyle}
//               onClick={() => {
//                 setSelectedGenre(genre.id);
//                 fetchMoviesByGenre(genre.id);
//               }}
//             >
//               {genre.name}
//             </button>
//           ))}
//         </Slider>
//         <div className="absolute top-1/2 transform -translate-y-1/2 right-0 flex items-center">
//           <button
//             className="mr-2"
//             onClick={() => setCurrentSlide(currentSlide - 1)}
//           >
//             <FaChevronLeft />
//           </button>
//           <button onClick={scrollToNextSlide}>
//             <FaChevronRight />
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {movies.map((movie) => (
//           <div
//             key={movie.id}
//             className="relative group cursor-pointer"
//             onClick={() => setDisplayedMovie(movie)}
//           >
//             <Link href={`/movie/${movie.id}`} key={movie.id}>
//               <div>
//                 <img
//                   src={`${IMAGE_BASE_URL}${movie.poster_path}`}
//                   alt={movie.title}
//                 />
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>

//       {displayedMovie && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
//           <div className="bg-white p-4 rounded-lg shadow-lgcontinued...
// ">
//             <h2 className="text-xl font-semibold mb-2">{displayedMovie.title}</h2>
//             <img
//               src={`${IMAGE_BASE_URL}${displayedMovie.poster_path}`}
//               alt={displayedMovie.title}
//               className="mb-2"
//             />
//             <p>{displayedMovie.overview}</p>
//             <p className="mt-2">
//               Release Date: {displayedMovie.release_date}
//             </p>
//             <button
//               className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
//               onClick={() => setDisplayedMovie(null)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Genres;