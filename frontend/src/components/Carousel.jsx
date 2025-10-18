import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import mc from "../assets/mc.jpg";
import apex from "../assets/apex.jpg";
import { useEffect } from "react";
import { Star } from "lucide-react";

export default function Carousel({ data }) {
  console.log(data);
  const images = data?.map((item) => {
    return item.background_image;
  });
  const names = data?.map((item) => {
    return item.name;
  });

  const [index, setIndex] = useState(0);

  console.log(index);
  useEffect(() => {
    console.log("render");
    setTimeout(handleChange, 5000);
  }, []);

  const handleChange = () => {
    setIndex((prev) => {
      if (prev >= images.length - 1) return 0;
      else {
        return prev + 1;
      }
    });
    setTimeout(handleChange, 5000);
  };

  return (
    <>
      <div className="relative h-80/100 lg:h-full overflow-hidden ">
        {/* <div
          className="h-40/100 absolute bg-zinc-950 blur-xl z-0 overflow-hidden w-[150%] left-[50%]
        translate-x-[-50%]  bottom-[-50px]"
        ></div> */}
        <div
          className="mask w-full object-cover h-full"
          style={{
            backgroundImage: `url(${images[index] || mc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: ".5s all linear",
          }}
        ></div>

        <div className="flex flex-col items-center inset-0 top-[65%] absolute ">
          <p className="text-4xl text-white p-0 tracking-widest h-fit mb-1 text-center">
            {names ? names[index] : "Minecraft"}
          </p>
          <div className="flex items-center gap-1 mb-4">
            <p className="text-[10px] text-zinc-400 ">Action | Adventure |</p>
            <span className="flex">
              <Star size={10} className="text-orange-500" />
              <Star size={10} className="text-orange-500" />
              <Star size={10} className="text-orange-500" />
              <Star size={10} className="text-orange-500" />
              <Star size={10} className="text-orange-500" />
            </span>
          </div>
          <div className="w-25 rounded-full h-1 bg-white">
            <div
              className={` bg-orange-500 h-full rounded-full transition-all duration-300`}
              style={{ width: (index / (images.length - 1)) * 100 + "%" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
