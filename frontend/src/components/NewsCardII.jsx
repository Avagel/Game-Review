export const NewsCardII = ({ article }) => {
  const {
    title = "Title",
    urlToImage = "",
    url = "",
    description = "kslfgougnjkgg",
    content = "sfkgllgj",
    publishedAt = "34.56.45",
  } = article;

  return (
    <div className="">
      <img
        src={urlToImage}
        alt=""
        className="aspect-331/222 lg:w-90 object-cover rounded-[30px]"
      />
      <p className="text-base text-xl mt-4 mb-3 text-zinc-200 tracking-wide">
        {title}
      </p>
      <p className="text-xs text-zinc-500 ">{description}.</p>
      <button
        className="text-xs px-5 rounded-full text-white py-2.5 bg-orange-500 mt-4 tracking-widest "
        onClick={() => {
          window.location.href = url;
        }}
      >
        {" "}
        Read Article
      </button>
    </div>
  );
};
