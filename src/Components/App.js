import Movie from "./Movie";
import Navbar from "./Navbar";
import React, { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="App">
      <Navbar searchQuery={searchQuery} handleSearchChange={handleSearchChange}/>
      <Movie searchQuery={searchQuery}/>
    </div>
  );
}

export default App;
