import { useSelector } from "react-redux/es/hooks/useSelector";
import styles from "../Styles/movie.module.css";
import del from "../Images/delete.png";
import { useEffect } from "react";
// import { useEffect } from "react";
import { getTrailerURL, fetchData } from "../Utils";
import { useDispatch } from "react-redux";
import { setTrailers,TogglePlayButton } from "../Reducers/MovieReducer";

export const Trailer = () => {
  const playButtonClicked = useSelector((state) => state.playButtonClicked);
  const trailers = useSelector((state) => state.allTrailers);
  const dispatch = useDispatch();

  console.log(trailers);
  useEffect(() => {
    const url = getTrailerURL(playButtonClicked);
    // const closeButtonClicked = useSelector((state)=> state.playButtonClicked);
    const response = fetchData(url);
    console.log(response);
    response.then((results) => {
      console.log(results);
      dispatch(setTrailers(results));
    });
  }, [playButtonClicked]);

  console.log(playButtonClicked);

  const handleClose=()=>{
    console.log("close");
    dispatch(TogglePlayButton(1));
  }
  return (
    <div className={styles.trailer}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h3>Trailer</h3>
        </div>
        <div className={styles.close} onClick={handleClose}>
          <img src={del}></img>
        </div>
      </div>
      <div className={styles.video}>
        {trailers.map((trailer) => {
          return (
            <iframe
              width="400vw"
              height="300vw"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              frameborder="1"
              allowFullScreen
              seamless
            ></iframe>
          );
        })}
      </div>
      <div className={styles.descriptiom}></div>
    </div>
  );
};
