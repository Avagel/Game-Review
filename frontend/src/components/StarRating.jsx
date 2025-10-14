import { Rating } from "react-simple-star-rating";

export default function StartRating({ value }) {
  return (
    <Rating
      readonly
      initialValue={4}
      size={20}
      fillColor="#facc15"
      SVGstyle={{ display: "inline-block" }}
    />
  );
}
