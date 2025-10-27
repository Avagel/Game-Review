import { Link } from "react-router";
import sekiro from "../assets/sekiro.jpg";
export const NewsCardII = ({ article }) => {
  const {
    title = "Title",
    urlToImage = sekiro,
    url = "",
    description = " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur itaque animi beatae ipsam excepturi, doloremque quasi atque ea enim. Repellendus corrupti accusamus quidem omnis! Consequatur hic nesciunt fugit distinctio labore.",
    content = "lorem40",
    publishedAt = "34.56.45",
  } = article;

  return (
    <div className="flex flex-col items-center">
      <img
        src={urlToImage}
        alt=""
        className="aspect-331/222 lg:w-90 object-cover rounded-[30px]"
      />
      <p className="text-base text-xl mt-3 mb-2 text-zinc-200 tracking-wide">
        {title}
      </p>
      <p className="text-xs text-zinc-500 text-center">{description}.</p>
      <Link to={url} className="text-xs text-orange-500 mt-5">
        Read Article
      </Link>
    </div>
  );
};
