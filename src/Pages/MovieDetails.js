import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import toast from "react-hot-toast";
import styles from "../Styles/moviedetail.module.css";
import { Card } from "../Components/Card";
import { Link } from "react-router-dom";

import play from "../Images/play.png";
import favorite from "../Images/favorite.png";
import { Trailer } from "../Components/Trailer";
import {
  getDetailsURL,
  getSimilarURL,
  getReviewURL,
  fetchData,
} from "../Utils";
import { useEffect } from "react";

import {
  setDetails,
  setReview,
  setSimilar,
} from "../Reducers/CardDetailsReducer";
import { Navigate } from "react-router-dom";
import { TogglePlayButton,setMovieDetailPage } from "../Reducers/MovieReducer";

export const MovieDetail = () => {
  const movie = useSelector((state) => state.movieDetailPage);
  const playButtonClicked = useSelector((state) => state.playButtonClicked);
  const page = useSelector((state) => state.pages);
  //   console.log(movie);
  const dispatch = useDispatch();

  const detail = useSelector((state) => state.details);
  const similar = useSelector((state) => state.similar);
  const review = useSelector((state) => state.review);

  console.log("movie",movie);
  console.log("Details:", detail);
  console.log("Similar:", similar);
  console.log("Review:", review);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const detailUrl = getDetailsURL(movie.id);
        const similarUrl = getSimilarURL(movie.id, page);
        const reviewUrl = getReviewURL(movie.id, page);

        // console.log("Details:", detailUrl);
        // console.log("Similar:", similarUrl);
        // console.log("Review:", reviewUrl);
        // Fetch data for details, similar, and review
        const [detailResponse, similarResponse, reviewResponse] =
          await Promise.all([
            fetchData(detailUrl),
            fetchData(similarUrl),
            fetchData(reviewUrl),
          ]);

        console.log("Details:", detailResponse);
        console.log("Similar:", similarResponse);
        console.log("Review:", reviewResponse);
        dispatch(setDetails(detailResponse));
        dispatch(setReview(reviewResponse.results));
        dispatch(setSimilar(similarResponse.results));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, [movie, page]);

  const handlePageChange=(isForward)=>{
    if(isForward){

    }else{

    }
  }

  const handleplayTrailer = (id) => {
    console.log(id);
    dispatch(TogglePlayButton(id));
  };

  const handlMovieDetailNav = (movie)=>{
    dispatch(setMovieDetailPage(movie))
  }
  if (Object.keys(movie).length === 0) {
    console.log("length 0");
    return <Navigate to="/" replace={true} />;
  }
  return (
    (Object.keys(detail).length !== 0 && detail.title)  && <div id={`${styles.detailPage}`}>
      {console.log("rendered")}
      {playButtonClicked !== 1 && <Trailer />}
      <div className={styles.flexdiv} id={styles.detailsWrapper}>
        <div className={styles.poster} onClick={() => handleplayTrailer(movie.id)}>
          <img
            className={styles.posterImg}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="Poster"
          />
        </div>
        <div className={`${styles.flexdiv} ${styles.details}`}>
          <div className={`${styles.flexdiv} ${styles.topDetails}`}>
            <div className={styles.name}>
              <h3>{movie.title}</h3>
            </div>
            <div className={styles.releaseDate}>
              <p>{movie.release_date}</p>
            </div>
            <div className={styles.ratingStars}>
              <div
                className={styles.starWrappers}
                style={{
                  background: `linear-gradient(to right,#facc15 ${
                    movie.vote_average * 10
                  }%, rgb(225, 225, 226) 20% 40%)`,
                }}
              >
                <img src={favorite} alt="Star" />
                <img src={favorite} alt="Star" />
                <img src={favorite} alt="Star" />
                <img src={favorite} alt="Star" />
                <img src={favorite} alt="Star" />
              </div>
            </div>
            <div className={styles.tagline}>
              <p>{detail.tagline}</p>
            </div>
            <div className={`${styles.flexdiv} ${styles.budget}`}>
              <p>Bugget : {detail.budget}</p>
              <p>Revenue : {detail.revenue}</p>
            </div>
          </div>
          <div className={styles.bottomDetails}>
            <h5>Overview</h5>
            {movie.overview}
          </div>
        </div>
      </div>

      <h4 className={styles.similarHeading}>Similar</h4>
      <div className={styles.flexdiv} id={styles.similarWrapper}>
        {/* {console.log(similar)} */}
        { similar.map((movie) => (
          <Link to={`/movieDetail/${movie.id}`} onClick={()=>handlMovieDetailNav(movie)}>
            <div className={styles.circleCardSimilar}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              ></img>
            </div>
          </Link>
        ))} 
      </div>
    </div>
  );
};
