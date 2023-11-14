export const getMovieDetails=async(movieId:number)=>{
    const url =`/api/get-movie-details/${movieId}`;
    try{
        const response=await fetch(url);
        if(!response.ok){
        return `Movie with id ${movieId} not found`
        }
        const result=await response.json();
        return result;

    }
    catch(error){
        return error
    }
}