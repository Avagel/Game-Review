import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import { PopularCard } from "./PopularCard";

// Sample data for the carousel slides

const Carousel = ({ slidesData }) => {
  slidesData = slidesData.slice(0, 10);
  // 1. State: Tracks the index of the currently visible slide.
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = slidesData.length;

  // 2. Navigation Logic: Handles moving to the next slide
  const goToNext = () => {
    // If we're on the last slide, go back to 0. Otherwise, increment.
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // 3. Navigation Logic: Handles moving to the previous slide
  const goToPrev = () => {
    // If we're on the first slide (0), go to the last slide. Otherwise, decrement.
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  // Optional: Auto-play feature
  useEffect(() => {
    const interval = setInterval(goToNext, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, [currentIndex]); // Restart timer whenever the index changes

  return (
    <>
    <img className="absolute transituon-all duration-300 inset-0 w-full h-full blur-[30px]" src={slidesData[currentIndex].background_image} alt="" />

      <div className="flex flex-col h-full w-full overflow-hidden">

        <div className="relative  w-full h-full aspect-[16/9] ">
          {/* Slides Track: All slides are horizontal, shifted by CSS transform */}
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slidesData.map((slide) => (
              // Individual Slide: Must take up 100% width and not shrink
              <PopularCard gameData = {slide} />
            ))}
          </div>
        </div>
        {/* --- Dot Indicators --- */}
      

      </div>
    </>
  );
};

// Helper component for navigation buttons
// const CarouselButton = ({ direction, onClick }) => {
//   const isNext = direction === "next";
//   const icon = isNext ? (
//     <FontAwesomeIcon icon={faCaretRight} className="h-6 w-6" />
//   ) : (
//     <FontAwesomeIcon icon={faCaretLeft} className="h-6 w-6" />
//   );
//   const position = isNext ? "right-4" : "left-4";

//   return (
//     <button
//       onClick={onClick}
//       className={`absolute top-1/2 ${position} transform -translate-y-1/2 bg-zinc-950/80 bg-opacity-40 text-white p-3 rounded-full 
//       w-4 h-4 hover:bg-opacity-70 transition duration-200 z-2 shadow-xl  ring-opacity-20 flex items-center justify-center`}
//       aria-label={`${direction} Slide`}
//     >
//       {icon}
//     </button>
//   );
// };

export default Carousel;
