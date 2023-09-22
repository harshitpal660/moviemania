import { useEffect } from "react";
import styles from "../Styles/movie.module.css";

import seemore from "../Images/seemore.png";


import { useDispatch } from "react-redux";
import {useSelector } from "react-redux/es/hooks/useSelector";
import { moviesURL, searchMoviesURL,fetchData } from "../Utils";

import {loadMovie } from "../Reducers/MovieReducer";
import { updatePage } from "../Reducers/MovieReducer";


import { Card } from "./Card";
function Movie() {

  const page = useSelector((state)=> state.pages);
  const movies = useSelector((state)=> state.movies);
  const fav = useSelector((state)=> state.favourites)

  console.log(movies);
  const searchQuery = useSelector((state) => state.searchQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("inside useeffect",searchQuery);
    let url = null;
    if (searchQuery === "") {
      url = moviesURL(1, false);
    } else {
      url = searchMoviesURL(searchQuery, 1, false);
    }
    const response = fetchData(url);
    response.then((results)=>{
      //  console.log(results);
        dispatch(loadMovie(results));
    })

  }, [searchQuery,fav]);

  
  const loadMoreContent = (page) => {
    // console.log(page);
    // console.log(query);
    let url = null;
    if (searchQuery === "") {
      url = moviesURL(page, false);
    } else {
      url = searchMoviesURL(searchQuery, page, false);
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
      <div className={styles.movies}>
        {movies.map((movie) => (
          <Card movie={movie}/>
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

// <iframe width="560" height="315" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
