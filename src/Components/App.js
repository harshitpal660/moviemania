import {Home} from "../Pages/Home";
import { Favourite } from "../Pages/Favourite";
import Navbar from "./Navbar";
import React from 'react';

import { Routes ,Route } from 'react-router-dom';


function App() {
 

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/favourite' element={<Favourite/>} />
      </Routes>
    </div>
  );
}

export default App;
