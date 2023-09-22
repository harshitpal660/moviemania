import React, { useState } from 'react';
import "../Styles/swapDemo.css" // Import your CSS for card styling

const SwapCardAnimation = () => {
  const [isSwapped, setIsSwapped] = useState(false);

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };

  return (
    <div className={`card ${isSwapped ? 'swapped' : ''}`} onClick={handleSwap}>
      <div className="front">Front Content</div>
      <div className="back">Back Content</div>
    </div>
  );
};

export default SwapCardAnimation;
