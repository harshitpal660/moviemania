import { useSelector } from "react-redux/es/hooks/useSelector";

import { Card } from "../Components/Card";
import { Player } from '@lottiefiles/react-lottie-player';
import styles from "../Styles/favourite.module.css";
export const Favourite = () => {
  const fav = useSelector((state) => state.favourites);
  const movies = Object.values(fav);
  return (
    <>
      <div className={styles.favourite}>
        {movies.length>0 ? (movies.map((movie) => (
          <Card movie={movie} />
        ))):(<Player
          className={styles.gif}
          autoplay
          loop
          // hover
          src="https://lottie.host/dc6cb949-646c-4966-98ca-31c1ab7f8f7d/0fALlnwgbu.json"
          style={{ height: "300px", width: "300px" }}
        >
        </Player>)}
      </div>
      
    </>
  );
};
