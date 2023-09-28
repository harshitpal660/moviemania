const API_ROOT = 'https://api.themoviedb.org/3/'
const AVATAR_ROOT = 'https://image.tmdb.org/t/p/w150_and_h150_face'
export const API = {
    Movies: (apiKey,page,adult)=>`${API_ROOT}discover/movie?api_key=${apiKey}&include_adult=${adult}&page=${page}&sort_by=popularity.desc`,
    Trailer: (apiKey,movieId)=>`${API_ROOT}movie/${movieId}/videos?api_key=${apiKey}`,
    Search: (apiKey,query,page,adult)=> `${API_ROOT}search/movie?api_key=${apiKey}&query=${query}&include_adult=${adult}&language=en-US&page=${page}`,
    Details: (movieId,apiKey)=>`${API_ROOT}movie/${movieId}?api_key=${apiKey}`,
    Review: (movieId,apiKey,page)=>`${API_ROOT}movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=${page}`,
    Similar: (movieId,apiKey,page)=>`${API_ROOT}movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=${page}`,
    Popular: (apiKey,page)=> `${API_ROOT}movie/popular?api_key=${apiKey}&language=en-US&page=${page}`,
    TopRated: (apiKey,page)=> `${API_ROOT}movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`,    
    Coming: (apiKey,page)=> `${API_ROOT}movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`,
    Theater: (apiKey,page)=> `${API_ROOT}movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`,
}

