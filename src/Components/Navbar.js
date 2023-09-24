import styles from "../Styles/navbar.module.css";
import magnifyingGlass from "../Images/magnifyingGlass.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../Reducers/MovieReducer";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

function Navbar() {
  const searchQuery = useSelector((state) => state.searchQuery);
  // console.log(searchQuery[0]);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
    // dispatch(loadMovie(e.target.value))
    console.log(e.target.value);
  };
  const handleClose=()=>{
    console.log("close");
    // dispatch();
  }
  return (
    <div className={styles.Navbar}>
      <div className={styles.searchbar}>
        <input
          type="text"
          placeholder="Search Movies"
          value={searchQuery}
          onChange={handleSearchChange}
        ></input>
        <img src={magnifyingGlass} alt="magnifyglass"></img>
      </div>
      <div className={styles.Navigation}>
        <Link to="/" className={styles.Link}>
          <div>Home</div>
        </Link>
        <Link to="/Favourite" className={styles.Link}>
          <div>Favourites</div>
        </Link>
        {isMobile &&<div className={styles.Link}>Categories</div>}
      </div>
     {!isMobile ? (<div className={styles.Categories}>
        {/* <div className={styles.close} onClick={handleClose}>
          <img src={del}></img>
        </div> */}
        <div className={`${styles.Link} ${styles.options}`}>In Theateres</div>
        <div className={`${styles.Link} ${styles.options}`}>Popular</div>
        <div className={`${styles.Link} ${styles.options}`}>Top Rated</div>
        <div className={`${styles.Link} ${styles.options}`}>Upcoming</div>
      </div>):(<div></div>)}
    </div>
  );
}

export default Navbar;
