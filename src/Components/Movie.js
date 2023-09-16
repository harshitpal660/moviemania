import { useState, useEffect } from "react";
import styles from "../Styles/movie.module.css";
import play from "../Images/play.png";
import favorite from "../Images/favorite.png";
import favorite2 from "../Images/favorite2.png";
import seemore from "../Images/seemore.png";
import info from "../Images/info.png";
import { moviesURL, searchMoviesURL,getTrailerURL,fetchData } from "../Utils";

function Movie({ searchQuery }) {
  // console.log();
  console.log(searchQuery);
  // for setting movies in website
  const [movies, setMovies] = useState([]);

  // for changing page to watch more movies
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log("inside useeffect");
    let url = null;
    if (searchQuery === "") {
      url = moviesURL(1, false);
    } else {
      url = searchMoviesURL(searchQuery, 1, false);
    }
    const response = fetchData(url);
    response.then((results)=>{
       console.log(results);
        setMovies(results);
    })

  }, [searchQuery]);

  const loadMoreContent = (page, query) => {
    console.log(page);
    console.log(query);
    let url = null;
    if (searchQuery === "") {
      url = moviesURL(1, false);
    } else {
      url = searchMoviesURL(searchQuery, 1, false);
    }

    console.log(url);
    const response = fetchData(url);

    response.then((results)=>{
       console.log(movies.concat(results));
        setMovies(movies.concat(results));
    })

  };

  const handlesetPage = () => {
    loadMoreContent(page + 1, searchQuery);
    setPage(page + 1);
  };

  const handleplayTrailer = () => {};


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
              <img src={favorite} alt="favorite" className={styles.icons}></img>
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
