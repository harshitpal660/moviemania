import { useEffect } from "react";
import styles from "../Styles/movie.module.css";

import seemore from "../Images/seemore.png";
import { isMobile } from "react-device-detect";


import { useDispatch } from "react-redux";
import {useSelector } from "react-redux/es/hooks/useSelector";
import { moviesURL, searchMoviesURL,fetchData } from "../Utils";

import {loadMovie, updatePage} from "../Reducers/MovieReducer";

import { Trailer } from "./Trailer";
import { Card } from "./Card";
function Movie() {

  const page = useSelector((state)=> state.pages);
  const movies = useSelector((state)=> state.movies);
  const fav = useSelector((state)=> state.favourites);
  const showAdult = useSelector((state)=>state.showAdult);
  const modalWarning = useSelector((state)=> state.modalWarning);
  const searchQuery = useSelector((state) => state.searchQuery);
  const playButtonClicked = useSelector((state)=> state.playButtonClicked);
  const dispatch = useDispatch();

  console.log(playButtonClicked);
  useEffect(() => {
    console.log("Adult",showAdult);
    let url = null;
    if (searchQuery === "" && !modalWarning) {
      url = moviesURL(1, showAdult);
    } else if(searchQuery !== "" && !modalWarning) {
      url = searchMoviesURL(searchQuery, 1, showAdult);
    }
    if(!modalWarning){const response = fetchData(url);
    response.then((results)=>{
      //  console.log(results);
        dispatch(loadMovie(results));
    })}

  }, [searchQuery,fav,showAdult]);

  
  const loadMoreContent = (page) => {
    // console.log(page);
    // console.log(query);
    console.log("Adult",showAdult);

    let url = null;
    if (searchQuery === "") {
      url = moviesURL(page, showAdult);
    } else {
      url = searchMoviesURL(searchQuery, page, showAdult);
    }

    // console.log(url);
    const response = fetchData(url);

    response.then((results)=>{
      //  console.log(movies.concat(results));
        // setMovies(movies.concat(results));
        dispatch(loadMovie(movies.concat(results)));
        // console.log(movies);
    })

  };

  const handlesetPage = () => {
    // console.log(page);
    loadMoreContent(page + 1);
    // setPage(page + 1);
    dispatch(updatePage(page+1));
  };

 
  return (
    <>
    {playButtonClicked !== 1 && <Trailer/>}
      <div className={`${styles.movies} ${isMobile ? "mobile":"desktop"}`}>
        {movies.map((movie) => (
          <Card movie={movie} key={movie.id}/>
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


