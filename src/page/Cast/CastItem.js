import React from "react";

function CastItem({ data }) {
  const { name, character, profile_path } = data;
  return (
    <div className="cast-item">
      <img
        src={
          profile_path
            ? `https://image.tmdb.org/t/p/w500${profile_path}`
            : "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
        }
        alt={name}
      />
      <p className="cast-name">{name} </p>
      <p className="cast-character">{character}</p>
    </div>
  );
}

export default CastItem;
