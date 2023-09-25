import { API } from "./API";

const API_KEY = "0bc7e251616ae6159c94a210c2a1555d";
export const moviesURL = (page, adult) => {
  const url = API.Movies(API_KEY, page, adult);
  return url;
};

export const searchMoviesURL = (query, page, adult) => {
  const url = API.Search(API_KEY, query, page, adult);
  return url;
};

export const getTrailerURL = (movieId) => {
  const url = API.Trailer(API_KEY, movieId);
  return url;
};

export const getReviewURL = (movieId,page) => {
  const url = API.Review(API_KEY, movieId,page);
  return url;
};

export const getDetailsURL = (movieId) => {
  const url = API.Details(API_KEY, movieId);
  return url;
};

export const getSimilarURL = (movieId,page) => {
  const url = API.Similar(API_KEY, movieId,page);
  return url;
};

export const getPopularURL = (page) => {
  const url = API.Popular(API_KEY,page);
  return url;
};

export const getTopRatedURL = (page) => {
  const url = API.TopRated(API_KEY,page);
  return url;
};

export const getComingURL = (page) => {
  const url = API.Coming(API_KEY,page);
  return url;
};

export const getTheaterURL = (page) => {
  const url = API.Theater(API_KEY,page);
  return url;
};


export const fetchData = async (url) => {
  const response = await fetch(url)
    .then((response) => {
      console.log(response); // Log the response here
      return response.json();
    })
    .then((response) => {
      return response.results;
    })
    .catch((err) => console.error(err));

  return response;
};
