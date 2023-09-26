import styles from "../Styles/navbar.module.css";
import magnifyingGlass from "../Images/magnifyingGlass.png";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { setSearchQuery, updatePage,updateScreenCards,toggleShowCategories} from "../Reducers/MovieReducer";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

function Navbar() {
  const searchQuery = useSelector((state) => state.searchQuery);
  const showCategories = useSelector((state)=> state.showCategories);
  
  // console.log(searchQuery[0]);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
    // dispatch(loadMovie(e.target.value))
    console.log(e.target.value);
  };
  const handleOptions = (option) => {
    dispatch(updatePage(1));
    dispatch(updateScreenCards(option))
   
  };

  const handleCategory = ()=>{
    console.log("handleCategory");
    dispatch(toggleShowCategories(!showCategories))
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
        <Link to="/favourite" className={styles.Link}>
          <div>Favourites</div>
        </Link>
        {isMobile && <div className={styles.Link} onClick={handleCategory}>Categories</div>}
      </div>
      {!isMobile && (
        <div className={styles.desktopCategories}>
          <div
            className={`${styles.Link} ${styles.options}`}
            onClick={() => handleOptions("theater")}
          >
            In Theateres
          </div>
          <div
            className={`${styles.Link} ${styles.options}`}
            onClick={() => handleOptions("popular")}
          >
            Popular
          </div>
          <div
            className={`${styles.Link} ${styles.options}`}
            onClick={() => handleOptions("top rated")}
          >
            Top Rated
          </div>
          <div
            className={`${styles.Link} ${styles.options}`}
            onClick={() => handleOptions("upcoming")}
          >
            Upcoming
          </div>
        </div>
      ) }
        {showCategories && (<div className={styles.mobileCategories}>
          <div
            className={`${styles.Link} ${styles.options}`}
            onClick={() => handleOptions("theater")}
          >
            In Theateres
          </div>
          <div
            className={`${styles.Link} ${styles.options}`}
            onClick={() => handleOptions("popular")}
          >
            Popular
          </div>
          <div
            className={`${styles.Link} ${styles.options}`}
            onClick={() => handleOptions("top rated")}
          >
            Top Rated
          </div>
          <div
            className={`${styles.Link} ${styles.options}`}
            onClick={() => handleOptions("upcoming")}
          >
            Upcoming
          </div>
        </div>)}
      
    </div>
  );
}

export default Navbar;
