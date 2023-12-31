import { useEffect } from "react";
import styles from "../Styles/movie.module.css";

import seemore from "../Images/seemore.png";
import { isMobile } from "react-device-detect";

import { Trailer } from "./Trailer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  moviesURL,
  searchMoviesURL,
  fetchData,
  getPopularURL,
  getTopRatedURL,
  getComingURL,
  getTheaterURL,
} from "../Utils";
import { setTotalPages, setTotalResults } from "../Reducers/ResultCountReducer";

import { loadMovie, updatePage } from "../Reducers/MovieReducer";

import { Card } from "./Card";
function Movie() {
  const page = useSelector((state) => state.pages);
  const movies = useSelector((state) => state.movies);
  const fav = useSelector((state) => state.favourites);
  const showAdult = useSelector((state) => state.showAdult);
  const showModal = useSelector((state) => state.modalWarning);
  // = useSelector((state)=> state.modalWarning);
  const searchQuery = useSelector((state) => state.searchQuery);
  const playButtonClicked = useSelector((state) => state.playButtonClicked);
  const cardsOnScreen = useSelector((state) => state.cardsOnScreen);

  const totalResults = useSelector((state) => state.totalResults);
  const totalPages = useSelector((state) => state.totalPages);
  const dispatch = useDispatch();

  console.log(page);
  useEffect(() => {
    console.log("Adult", showAdult);
    let url = null;
    if (searchQuery === "") {
      switch (cardsOnScreen) {
        case "movies":
          url = moviesURL(1, showAdult);
          // console.log(url, " ", page);
          break;
        case "theater":
          url = getTheaterURL(1);
          // console.log(url, " ", page);
          break;
        case "popular":
          url = getPopularURL(1);
          // console.log(url, " ", page);
          break;
        case "upcoming":
          url = getComingURL(1);
          // console.log(url, " ", page);
          break;
        case "top rated":
          url = getTopRatedURL(1);
          // console.log(url, " ", page);
          break;
        default:
          console.log(cardsOnScreen);
      }
    } else if (searchQuery !== "") {
      url = searchMoviesURL(searchQuery, 1, showAdult);
    }
    const response = fetchData(url);
    // console.log(response);
    response.then((results) => {
      //  console.log(results);
      dispatch(loadMovie(results.results));
      dispatch(setTotalResults(results.total_results));
      dispatch(setTotalPages(results.total_pages))
    });
  }, [searchQuery, fav, showAdult, cardsOnScreen]);

  const loadMoreContent = (page) => {
    // console.log(page);
    // console.log(query);

    let url = null;
    if (searchQuery === "") {
      switch (cardsOnScreen) {
        case "movies":
          url = moviesURL(page, showAdult);
          // console.log(url, " ", page);
          break;
        case "theater":
          url = getTheaterURL(page);
          // console.log(url, " ", page);
          break;
        case "popular":
          url = getPopularURL(page);
          // console.log(url, " ", page);
          break;
        case "upcoming":
          url = getComingURL(page);
          // console.log(url, " ", page);
          break;
        case "top rated":
          url = getTopRatedURL(page);
          // console.log(url, " ", page);
          break;
        default:
          console.log(cardsOnScreen);
      }
    } else {
      url = searchMoviesURL(searchQuery, page, showAdult);
    }

    // console.log(url);
    const response = fetchData(url);
    // console.log(response);
    response.then((results) => {
      //  console.log(results);
      // setMovies(movies.concat(results));
      dispatch(loadMovie(movies.concat(results.results)));
      dispatch(setTotalResults(results.total_results));
      dispatch(setTotalPages(results.total_pages))
      // console.log(movies);
    });
  };

  const handlesetPage = () => {
    // console.log(page);
    loadMoreContent(page + 1);
    // setPage(page + 1);
    dispatch(updatePage(page + 1));
  };

  return (
    <>
      {playButtonClicked !== 1 && <Trailer />}
      <div className={`${isMobile ? styles.mobileTotalResults : styles.desktopTotalResults}`}>
          {isMobile ? <h4>Total Result : {totalResults}</h4>:<h3>Total Result : {totalResults}</h3>}
          <p className={`${isMobile ? styles.mobileTotalPages : styles.desktopTotalPages}`}>
            {page}/{totalPages}
          </p>
        </div>
      <div className={`${styles.movies} ${isMobile ? "mobile" : "desktop"}`}>
        
        {movies.map((movie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>
      <div id={styles.loadmore} onClick={handlesetPage}>
        <img src={seemore} alt="loadmore" className={styles.icons}></img>
        <p style={{ margin: "0 0 0 5px", padding: "0" }}>See more...</p>
      </div>
    </>
  );
}

export default Movie;
