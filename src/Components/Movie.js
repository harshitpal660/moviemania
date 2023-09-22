import { useEffect } from "react";
import styles from "../Styles/movie.module.css";

import play from "../Images/play.png";
import favorite from "../Images/favorite.png";
import seemore from "../Images/seemore.png";
import info from "../Images/info.png";
import favorite2 from "../Images/favorite2.png"

import { useDispatch } from "react-redux";
import {useSelector } from "react-redux/es/hooks/useSelector";
import { moviesURL, searchMoviesURL,getTrailerURL,fetchData } from "../Utils";

import { addToFav, loadMovie, removeFromFav } from "../Reducers/MovieReducer";
import { updatePage } from "../Reducers/MovieReducer";
import toast from 'react-hot-toast';
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

  const handleplayTrailer = () => {

  };

  const handleAddToFav = (movie) =>{
    console.log(movie);
    dispatch(addToFav(movie));
    console.log(fav);
    toast.success("Added To Favourite")
  }
  const handleremoveFromFav = (id) =>{
    console.log(id);
    dispatch(removeFromFav(id));
    console.log(fav);
  }


  return (
    <>
      <div className={styles.movies}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.card}>
            <div className={styles.fixed_height_div}>
              <h2>{movie.title}</h2>
            </div>
            <div className={styles.image_wrapper}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className={styles.buttons}>
              {movie.addButtonActivated ?(<img src={favorite2} alt="favorite" className={styles.icons} onClick={()=>handleremoveFromFav(movie.id) }></img>):(<img src={favorite} alt="favorite" className={styles.icons} onClick={()=>handleAddToFav(movie) }></img>)}
              <img
                src={play}
                alt="play"
                id={styles.play}
                onClick={handleplayTrailer}
              ></img>
              <img src={info} alt="info" className={styles.icons}></img>
            </div>
            {/* Render other movie details here */}
          </div>
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
