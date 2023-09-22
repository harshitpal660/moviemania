import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { addToFav, removeFromFav } from "../Reducers/MovieReducer";

import play from "../Images/play.png";
import favorite from "../Images/favorite.png";
import info from "../Images/info.png";
import favorite2 from "../Images/favorite2.png"

import toast from "react-hot-toast";
import styles from "../Styles/favourite.module.css";
export const Favourite = () => {
  const fav = useSelector((state) => state.favourites);
  const dispatch = useDispatch();
  console.log(Object.values(fav));

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
    <div className={styles.favourite}>
    {Object.values(fav).map((movie) => (
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
      </div>
    ))}
  </div>
    </>
  );
};
