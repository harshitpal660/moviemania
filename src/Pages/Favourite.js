import { useSelector } from "react-redux/es/hooks/useSelector";
import { isMobile } from "react-device-detect";

import { Card } from "../Components/Card";
import { Player } from "@lottiefiles/react-lottie-player";
import styles from "../Styles/favourite.module.css";
import { Trailer } from "../Components/Trailer";
export const Favourite = () => {
  const fav = useSelector((state) => state.favourites);
  const movies = Object.values(fav);
  const modalWarning = useSelector((state) => state.modalWarning);
  const playButtonClicked = useSelector((state) => state.playButtonClicked);

  console.log(modalWarning);
  return (
    <>
      {playButtonClicked !== 1 && <Trailer />}
      
      <div className={`${styles.favourite} ${isMobile ? "mobile" : "desktop"}`}>
        {movies.length > 0 &&
          !modalWarning &&
          movies.map((movie) => (
            <Card movie={movie} key={movie.id} />
            // <div>handleClose</div>
          ))}
        {movies.length === 0 && !modalWarning && (
          <Player
            className={styles.gif}
            autoplay
            loop
            // hover
            src="https://lottie.host/dc6cb949-646c-4966-98ca-31c1ab7f8f7d/0fALlnwgbu.json"
            style={{ height: "300px", width: "300px" }}
          ></Player>
        )}
      </div>
    </>
  );
};
