import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../../constans";
import SimularColumn from "../Simular/SimularColumn";
import "./Watch.css";

function WatchMovie() {
  const params = useParams();

  const [info, setInfo] = useState({});

  const { id } = params;

  useEffect(() => {
    const getInfo = (id) => {
      fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => setInfo(data));
    };

    getInfo(id);
  }, []);
  return (
    <div className="container">
      <div className="watch-movie-container">
        <div className="watch-movie">
          <iframe
            width="100%"
            src={`https://www.2embed.ru/embed/tmdb/movie?id=${id}`}
            title="Movie player"
            frameBorder="0"
            allowFullScreen
          />
          <h1 className="movie-name">{info.title}</h1>
          <p className="movie-overview">{info.overview}</p>
          <p className="movie-release_date">
            Release date: {info.release_date}
          </p>
        </div>
        <div className="simularMovie">
          <SimularColumn />
        </div>
      </div>
    </div>
  );
}

export default WatchMovie;
