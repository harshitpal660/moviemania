const API_ROOT = 'https://api.themoviedb.org/3/'
const AVATAR_ROOT = 'https://image.tmdb.org/t/p/w150_and_h150_face'
export const API = {
    Movies: (apiKey,page,adult)=>`${API_ROOT}discover/movie?api_key=${apiKey}&include_adult=${adult}&page=${page}&sort_by=popularity.desc`,
    Trailer: (apiKey,movieId)=>`${API_ROOT}movie/${movieId}/videos?api_key=${apiKey}`,
    Search: (apiKey,query,page,adult)=> `${API_ROOT}search/movie?api_key=${apiKey}&query=${query}&include_adult=${adult}&language=en-US&page=${page}`,
    Details: (movieId,apiKey)=>`${API_ROOT}movie/${movieId}?api_key=${apiKey}`,
    Review: (movieId,apiKey)=>`${API_ROOT}movie/${movieId}?api_key=${apiKey}/reviews?language=en-US&page=1`,
    Similar: (movieId,apiKey)=>`${API_ROOT}movie/${movieId}?api_key=${apiKey}/similar?language=en-US&page=1`,
    Popular: (apiKey)=> `${API_ROOT}movie/now_playing?api_key=${apiKey}/language=en-US&page=1`,
    TopRated: (apiKey)=> `${API_ROOT}movie/now_playing?api_key=${apiKey}/language=en-US&page=1`,    
    coming: (apiKey)=> `${API_ROOT}movie/now_playing?api_key=${apiKey}/language=en-US&page=1`
}

