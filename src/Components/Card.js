import {
  addToFav,
  removeFromFav,
  getFlippedCards,
  TogglePlayButton,
  setMovieDetailPage,
} from "../Reducers/MovieReducer";

import play from "../Images/play.png";
import favorite from "../Images/favorite.png";
import info from "../Images/info.png";
import favorite2 from "../Images/favorite2.png";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { isMobile } from "react-device-detect";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "../Styles/card.module.css";
import style2 from "../Styles/cardMobile.module.css";

export const Card = (props) => {
  const movie = props.movie;
  const dispatch = useDispatch();
  const flippedCards = useSelector((state) => state.flippedCards);
  const isFlipped = flippedCards.includes(movie.id);
  // console.log(movie);

  const handleplayTrailer = (id) => {
    console.log(id);
    dispatch(TogglePlayButton(id));
  };

  const handleAddToFav = (movie) => {
    console.log(movie);
    dispatch(addToFav(movie));

    toast.success("Cheers to curating a blockbuster hitlist!");
  };
  const handleremoveFromFav = (id) => {
    console.log(id);
    toast.success("removed from favourite", {
      icon: "🗑",
    });
    dispatch(removeFromFav(id));
  };

  const handleSwap = (id) => {
    dispatch(getFlippedCards(id));
  };

  const handlMovieDetailNav = () => {
    // movie.addButtonActivated = false;
    dispatch(setMovieDetailPage(movie));
  };
  return (
    <div key={movie.id} className={`${isMobile ? style2.card : styles.card}`}>
      <div className={`${isMobile ? style2.fixedHeight : styles.fixedHeight}`}>
        {isMobile ? <h6>{movie.title}</h6> : <h4>{movie.title}</h4>}
        <div className={styles.voteAverage}>
          <p>Released : {movie.release_date}</p>
          <div  className={`${isMobile ? style2.release : styles.release}`}
        
          >
            <p style={{marginTop:"0.5vh"}}>{movie.vote_average}</p>
          </div>
        </div>
      </div>

      <div
        className={`${styles.cardWrapper} ${isFlipped ? styles.flipCard : ""}`}
      >
        <Link to={`/movieDetail/${movie.id}`} onClick={handlMovieDetailNav}>
          <div
            className={`${styles.image_wrapper} ${
              isMobile ? style2.front : styles.front
            }`}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        </Link>
        <div className={`${isMobile ? style2.back : styles.back}`}>
          <p className="back">{movie.overview}</p>
        </div>
      </div>

      <div className={`${isMobile ? style2.buttons : styles.buttons}`}>
        {movie.addButtonActivated ? (
          <img
            src={favorite2}
            alt="favorite"
            className={`${isMobile ? style2.icons : styles.icons}`}
            onClick={() => handleremoveFromFav(movie.id)}
          ></img>
        ) : (
          <img
            src={favorite}
            alt="favorite"
            className={`${isMobile ? style2.icons : styles.icons}`}
            onClick={() => handleAddToFav(movie)}
          ></img>
        )}
        <img
          src={play}
          alt="play"
          id={`${isMobile ? style2.play : styles.play}`}
          onClick={() => handleplayTrailer(movie.id)}
        ></img>
        <img
          src={info}
          alt="info"
          className={`${isMobile ? style2.icons : styles.icons}`}
          onClick={() => handleSwap(movie.id)}
        ></img>
      </div>
    </div>
  );
};
