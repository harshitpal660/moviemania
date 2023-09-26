import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import toast from "react-hot-toast";
import styles from "../Styles/moviedetail.module.css";
import { Card } from "../Components/Card";
import { Trailer } from "../Components/Trailer";
import { getDetailsURL,getSimilarURL,getReviewURL,fetchData } from "../Utils";
import { useEffect } from "react";

export const MovieDetail = () => {
  const movie = useSelector((state) => state.movieDetailPage);
  const playButtonClicked = useSelector((state) => state.playButtonClicked);
  const page = useSelector((state) => state.pages);
//   console.log(movie);

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
        const [detailResponse, similarResponse, reviewResponse] = await Promise.all([
          fetchData(detailUrl),
          fetchData(similarUrl),
          fetchData(reviewUrl)
        ]);
  
        console.log("Details:", detailResponse);
        console.log("Similar:", similarResponse);
        console.log("Review:", reviewResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchDataAsync();
  }, [movie, page]);
  

  return (
    <div
      className={`${styles.movieDetails} `}
    >
      {playButtonClicked !== 1 && <Trailer />}
      <div className={`${isMobile ? "mobile" : "desktop"}`}>
        {Object.keys(movie).length > 0 && <Card movie={movie} key={movie.id} />}

      </div>
    </div>
  );
};
