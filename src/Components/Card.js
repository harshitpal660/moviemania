import { addToFav, removeFromFav } from "../Reducers/MovieReducer";
import { getFlippedCards } from "../Reducers/MovieReducer";

import play from "../Images/play.png";
import favorite from "../Images/favorite.png";
import info from "../Images/info.png";
import favorite2 from "../Images/favorite2.png";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";

import toast from "react-hot-toast";
import styles from "../Styles/card.module.css";

export const Card = (movie) => {
  movie = movie.movie;
  const dispatch = useDispatch();
  const flippedCards = useSelector((state) => state.flippedCards);
  const isFlipped = flippedCards.includes(movie.id);

  console.log(flippedCards, " ", isFlipped);

  const handleplayTrailer = (id) => {
    console.log(id);
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
  return (
    <div key={movie.id} className={styles.card}>
      <div className={styles.fixed_height_div}>
        <h3>{movie.title}</h3>
      </div>
      <div className={`${styles.cardWrapper} ${isFlipped ? styles.flipCard : ""}`}>
        <div className={`${styles.image_wrapper} ${styles.front}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className={styles.back}>back</div>
      </div>

      <div className={styles.buttons}>
        {movie.addButtonActivated ? (
          <img
            src={favorite2}
            alt="favorite"
            className={styles.icons}
            onClick={() => handleremoveFromFav(movie.id)}
          ></img>
        ) : (
          <img
            src={favorite}
            alt="favorite"
            className={styles.icons}
            onClick={() => handleAddToFav(movie)}
          ></img>
        )}
        <img
          src={play}
          alt="play"
          id={styles.play}
          onClick={() => handleplayTrailer(movie.id)}
        ></img>
        <img
          src={info}
          alt="info"
          className={styles.icons}
          onClick={() => handleSwap(movie.id)}
        ></img>
      </div>
    </div>
  );
};
