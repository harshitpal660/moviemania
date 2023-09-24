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

export const getReviewURL = (movieId) => {
  const url = API.Review(API_KEY, movieId);
  return url;
};

export const getDetailsURL = (movieId) => {
  const url = API.Details(API_KEY, movieId);
  return url;
};

export const getSimilarURL = (movieId) => {
  const url = API.Similar(API_KEY, movieId);
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
