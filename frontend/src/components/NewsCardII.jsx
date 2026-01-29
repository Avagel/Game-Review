import { Link } from "react-router";
import sekiro from "../assets/sekiro.jpg";
export const NewsCardII = ({ article }) => {
  const {
    title = "Title",
    urlToImage = sekiro,
    image,
    url = "",
    description = " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur itaque animi beatae ipsam excepturi, doloremque quasi atque ea enim. Repellendus corrupti accusamus quidem omnis! Consequatur hic nesciunt fugit distinctio labore.",
    content = "lorem40",
    publishedAt = "34.56.45",
  } = article;

  return (
    <div className="flex flex-col items-center bg-zinc-800/80 rounded-xl news-card overflow-hidden">
      <img
        src={image || urlToImage}
        alt=""
        className="h-1/2 lg:w-full object-cover rounded-xl"
      />
      <div className=" p-6 ">
        <p className="text-xl  mb-4  text-white tracking-wide ">
          {title.length > 43 ? title.slice(0, 44) + "..." : title}
        </p>
        {/* <p className="text-sm text-white/60  font-light desc mb-3">
          {description.length > 46
            ? description.slice(0, 49) + "..."
            : description}
        </p> */}
        <Link
          to={url}
          className="text-xs lg:text-sm bg-orange-500  px-3 py-2 rounded-sm mt-5"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
};
