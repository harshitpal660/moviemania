import { Home } from "../Pages/Home";
import { Favourite } from "../Pages/Favourite";
import { MovieDetail } from "../Pages/MovieDetails";
import Navbar from "./Navbar";
import React from "react";

import { Routes, Route } from "react-router-dom";
import { isAdult, warningActions } from "../Reducers/MovieReducer";
import { useDispatch } from "react-redux";
import {useSelector } from "react-redux/es/hooks/useSelector";
import WarningModal from "./WaringModal";
function App() {
  const dispatch = useDispatch();
  const showAdult = useSelector((state)=>state.showAdult)
  const showModal = useSelector((state)=>state.modalWarning)

  console.log("showadult",showAdult);

  const handleTypeModal = (type) => {
    dispatch(warningActions(!showModal))
    dispatch(isAdult(type))
  };

  return (
    <div className="App">    
      <WarningModal isOpen={showModal} handleType={handleTypeModal} />
      <Navbar />
      <Routes>
        <Route path="/" element={!showModal && <Home />} />
        <Route path="/favourite" element={!showModal && <Favourite />} />
        <Route path="/movieDetail" element={!showModal && <MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
