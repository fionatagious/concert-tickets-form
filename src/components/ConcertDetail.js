import React from "react";
import imageMap from "../images/imageMap.js";

function ConcertDetail({ band }) {
  // clean description_blurb — remove HTML tags and last period if it exists
  const bandDescription = band.description_blurb
    .replace(/<\/?(div|b|p|h3)[^>]*>/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/</g, "")
    .replace(/ \.$/, "");

  return (
    <div className="flex flex-col max-w-2xl px-6">
      <img
        src={imageMap[band.imgUrl]}
        alt={`band-photo-${band.name}`}
        width="600"
        className="rounded-lg"
      />
      <p className="my-4 text-wrap">{bandDescription}</p>
    </div>
  );
}

export default ConcertDetail;
