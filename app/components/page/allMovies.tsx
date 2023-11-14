'use client';
import { useState,useEffect } from 'react'
import { getMovies } from '@/app/utilities/getMovies';
import { IMAGE_BASE_URL } from '@/app/config';
import Link from 'next/link';
interface MovieProps{
  id:number;
  title:string;
  genre_ids:number[];
  poster_path:string
}
export default function MoviesComponent() {
  const [movies,setMovies]=useState<MovieProps[]>();
  useEffect(()=>{
    (async()=>{
      const movies=await getMovies();
      setMovies(movies)
      console.log({movies});
    })();
  },[])
  return (
    <main className='p-2 bg-black '>
      <h1>Popular movies</h1>
      <div className='grid grid-cols-4 gap-4 mb-10'>
      {movies?.map((item)=>(
      <Link href={`/movie/${item.id}`} key={item.id}>
            
      <div>
        <img src={`${IMAGE_BASE_URL}${item.poster_path}`} alt={item.title} />
      </div>
  </Link>
     ))}
      </div>
     
    </main>
  )
}
