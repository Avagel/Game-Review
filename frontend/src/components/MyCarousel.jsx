import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import mc from "../assets/mc.jpg";
import apex from "../assets/apex.jpg";
import { useEffect } from "react";
import { Star } from "lucide-react";
import CarouselItem from "./CarouselItem";
import { Carousel } from "flowbite-react";

export default function MyCarousel({ data, index }) {
  console.log("Carousel data:", data);
  const images = data?.map((item) => {
    return item.background_image;
  });
  const names = data?.map((item) => {
    return item.name;
  });

  return (
    <>
      <div className="hidden  md:block lg:block w-full mt-10 h-130  rounded-3xl relative overflow-hidden">
        <Carousel
          className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onSlideChange={(index) => console.log("onSlideChange()", index)}
        >
          {data.map((project, index) => {
            return <CarouselItem data={project} />;
          })}
        </Carousel>
      </div>
      {/* <div className=" rounded-md relative h-full w-full lg:h-fit overflow-hidden lg:mt-2 lg:pt-20 lg:px-30  lg:flex lg:justify-center gap-5 ">
        <div
          className=" w-full object-cover h-[70%] mask lg:hidden"
          style={{
            backgroundImage: `url(${images[index] || mc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: ".5s all linear",
          }}
        ></div>

        <div
          className="relative
         hidden lg:block w-full object-cover h-[90%] lg:w-full lg:h-100  lg:rounded-xl lg:overflow-hidden p-4 bg-zinc-900/80 "
        >
          <img
            src={`${images[index] || mc}`}
            className="w-full h-full object-cover lg:rounded-xl"
            alt=""
          />
        </div>

        <div className="flex flex-col items-start inset-0 top-[75%] ml-6 lg:top-[60%]  lg:hidden">
          <p className="text-4xl text-white p-0 tracking-widest h-fit mb-1 w-full ">
            {names ? names[index] : "Minecraft"}
          </p>

          <div className="flex items-center gap-1 mb-5 text-zinc-400">
            <p className="text-sm ">Action | Adventure |</p>
            <span className="flex items-baseline gap-1">
              <p className="text-sm">4.0</p>
              <Star size={10} className="text-orange-500" />
            </span>
          </div>
          <p className="text-xs text-orange-500">See Details</p>
        </div>
      </div> */}
    </>
  );
}
