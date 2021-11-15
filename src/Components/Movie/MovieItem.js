import React from "react";
import "./MovieItem.css";

function MovieItem({ data }) {
  const { poster_path } = data;
  return (
    <div className="movie-item">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
        }
        alt={data.title ? data.title : data.name}
      />
      <p className="movie-title">{data.title ? data.title : data.name}</p>
    </div>
  );
}

export default MovieItem;
