const API_ROOT = 'https://api.themoviedb.org/3/'
export const API = {
    Movies: (apiKey,page,adult)=>`${API_ROOT}discover/movie?api_key=${apiKey}&include_adult=${adult}&page=${page}&sort_by=popularity.desc`,
    Trailer: (apiKey,movieId)=>`${API_ROOT}movie/${movieId}?api_key=${apiKey}&append_to_response=videos`,
    Search: (apiKey,query,page,adult)=> `${API_ROOT}search/movie?api_key=${apiKey}&query=${query}&include_adult=${adult}&language=en-US&page=${page}`
}