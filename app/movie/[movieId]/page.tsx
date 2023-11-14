'use client'
import { useEffect, useState } from "react";
import { getMovieDetails } from "@/app/utilities/getMovieDetails";
import { IMAGE_BASE_URL } from "@/app/config";

interface MovieDetailProps {
  id: number;
  title: string;
  genre_ids: number[];
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}
const MovieDetail = ({ params: { movieId } }: { params: { movieId: number } }) => {
const [movieDetails, setMovieDetails] = useState<MovieDetailProps>();
useEffect(() => {
    (async()=>{
      const details=await getMovieDetails(movieId);
        setMovieDetails(details);
    })();
  });
  return (
    <div>
      {movieDetails ? (
        <div className="flex flex-column items-center justify-center text-xl text-clip font-serif">
        <div className="rounded mt-20">
       <img src={`${IMAGE_BASE_URL}${movieDetails.poster_path}`} alt={movieDetails.title} className="rounded" />
       </div>                                                                                                                                                                         
       <div className="w-[50%] ml-[5%] h-20">
  <h2 className="font-bold text-3xl">{movieDetails.title}</h2>
  <p>
    <b>Release Date:</b> {movieDetails.release_date}
  </p>
  <p>
    <b>Overview:</b> {movieDetails.overview}
  </p>
  <p>
    <b>Vote Average:</b> {movieDetails.vote_average}
  </p>
</div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
export default MovieDetail;