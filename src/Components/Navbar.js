import styles from "../Styles/navbar.module.css";
import magnifyingGlass from "../Images/magnifyingGlass.png";
function Navbar({ searchQuery, handleSearchChange }) {
  console.log();
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
    </div>
  );
}


export default Navbar;
