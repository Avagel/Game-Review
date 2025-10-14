import { text } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const TestingAPI = () => {
  const [img, setImg] = useState("");
  const imageUrl =
    "https://i.pinimg.com/736x/d7/3d/24/d73d2497f52815cde1b083931a740ddf.jpg";
  useEffect(() => {
    // removeBackground();
    testnews();
  }, []);
  const testnews = async () => {
    const url =
      "https://newsapi.org/v2/everything?" +
      "q=Epic%20games&" +
      "from=2025-10-03&" +
      "sortBy=popularity&" +
      "apiKey=5c6be23958a747858dd11fb381cda64e";

    const res = await axios.get(url);
    console.log(res.data);
  };

  return (
    // <div className=" relative overflow-y-scroll h-screen perspective-[1px] transform-style-preserve-3d">
    //   <p
    //     className="absolute top-0 flex w-full items-center justify-center text-7xl font-bold text-center z-4 translate-z-[-0.5px] scale-[1.5]"
    //     data-parallax
    //     data-speed="0.6"
    //   >
    //     Apex Legends
    //   </p>

    //   <img
    //     className="absolute inset-0 drop-shadow-[5px_5px_5px_#000] z-5 translate-z-[]"
    //     src={img}
    //     alt=""
    //     data-parallax
    //     data-speed="0.3"
    //   />

    //   <img
    //     className="absolute inset-0 translate-z-[]"
    //     src={imageUrl}
    //     alt=""
    //     data-parallax
    //     data-speed="0.1"
    //   />

    //   <div className="h-[4000px]"></div>
    // </div>
    <div></div>
  );

  async function removeBackground() {
    try {
      const formData = new FormData();
      formData.append("size", "auto");
      formData.append("image_url", imageUrl);

      const res = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        formData,
        {
          headers: {
            "X-Api-Key": "J48SrBD8UtJu3sj7xvJC6cnd",
          },
          responseType: "blob",
        }
      );

      // ✅ Turn blob into displayable image
      const blobUrl = URL.createObjectURL(res.data);
      setImg(blobUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  function handleParallax() {
    console.log("scrolling");
    const parallaxElements = document.querySelectorAll("[data-parallax]");

    const scrollPosition = window.pageYOffset;

    parallaxElements.forEach((element) => {
      // Get the custom speed from the data attribute
      const speed = parseFloat(element.getAttribute("data-speed")) || 0.5;

      // Calculate the new Y-offset
      // The negative sign is often used to make the background appear to scroll "up" slower
      const yOffset = scrollPosition * speed * -1;

      // Apply the transformation
      element.style.transform = `translateY(${yOffset}px)`;
      console.log(yOffset);
    });
  }
};
