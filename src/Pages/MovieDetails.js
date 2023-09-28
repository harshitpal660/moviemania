import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import toast from "react-hot-toast";
import styles from "../Styles/moviedetail.module.css";
import { Card } from "../Components/Card";

import { Link } from "react-router-dom";

import play from "../Images/play.png"
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
import { Navigate } from 'react-router-dom';
import { TogglePlayButton } from "../Reducers/MovieReducer";

export const MovieDetail = () => {
  const movie = useSelector((state) => state.movieDetailPage);
  const playButtonClicked = useSelector((state) => state.playButtonClicked);
  const page = useSelector((state) => state.pages);
  //   console.log(movie);
  const dispatch = useDispatch();

  const detail = useSelector((state) => state.details);
  const similar = useSelector((state) => state.similar);
  const review = useSelector((state) => state.review);

  console.log("Details:", detail);
  console.log("Similar:", similar);
  console.log("Review:", review);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const detailUrl = getDetailsURL(movie.id);
        const similarUrl = getSimilarURL(movie.id, page);
        const reviewUrl = getReviewURL(movie.id, page);

        console.log("Details:", detailUrl);
        console.log("Similar:", similarUrl);
        console.log("Review:", reviewUrl);
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
        dispatch(setReview(reviewResponse));
        dispatch(setSimilar(similarResponse));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, [movie, page]);

  const handleplayTrailer = (id) => {
    console.log(id);
    dispatch(TogglePlayButton(id));
  };
  if(Object.keys(movie).length === 0){
    console.log("length 0");
    return <Navigate to="/" replace={true} />
  }
  return (
    <div>
      {Object.keys(movie).length > 0 && (
        <div className={`${styles.movieDetails}`}>
          {playButtonClicked !== 1 && <Trailer />}
          <div className={`${styles.detailsWrapper} ${isMobile ? styles.mobile : styles.desktop}`}>
            <div className={styles.poster} onClick={() => handleplayTrailer(movie.id)}>
              <img className={styles.posterImg} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Poster" />
              <img className={styles.play} src={play} alt="Play" />
            </div>
            <div className={styles.otherDetails}>
              <p>{movie.title}</p>
              <p>{movie.release_date}</p>
              <div
                className={styles.ratingStars}
                style={{
                  background: `linear-gradient(to right,#facc15 ${movie.vote_average * 10}%, rgb(225, 225, 226) 20% 40%)`
                }}
              >
                <img src={favorite} alt="Star" />
                <img src={favorite} alt="Star" />
                <img src={favorite} alt="Star" />
                <img src={favorite} alt="Star" />
                <img src={favorite} alt="Star" />
              </div>
              <p style={{ textAlign: "left", whiteSpace: "nowrap" }}>{detail.tagline}</p>
              <a href="review">Review</a>
            </div>
          </div>
          <div className={styles.overview}>
            <h4 style={{ textAlign: "center", margin: "0" }}>Overview</h4>
            <p style={{ textAlign: "justify" }}>{movie.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
  
};
