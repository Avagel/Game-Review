import { useEffect } from "react";
import { Carousel, initTWE } from "tw-elements";

export const TestCarousel = () => {
    initTWE({ Carousel });
  return (
    <div
      className="w-full relative h-60 bg-sky-500"
      id="carouselExampleSlidesOnly"
      data-twe-ride
      data-twe-carousel-init
    >
      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
        <div
          className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-twe-carousel-item
          data-twe-carousel-active
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
            className="block w-full"
            alt="Wild Landscape"
          />
        </div>
        <div
          className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-twe-carousel-item
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
            className="block w-full"
            alt="Camera"
          />
        </div>
        <div
          className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-twe-carousel-item
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
            className="block w-full"
            alt="Exotic Fruits"
          />
        </div>
        
      </div>
    </div>
  );
};
