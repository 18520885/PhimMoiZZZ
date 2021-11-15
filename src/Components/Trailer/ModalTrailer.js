import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../../constans";
import "./Trailer.css";

function ModalTrailer({ show, setShow }) {
  const params = useParams();

  const { media_type, id } = params;

  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const getTrailer = (media_type, id) => {
      fetch(`${BASE_URL}/${media_type}/${id}/videos?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          setTrailers(data.results);
        })
        .catch((err) => console.log(err));
    };

    getTrailer(media_type, id);
  }, []);

  return (
    <div
      className="overlay"
      style={{ display: show ? "flex" : "none" }}
      onClick={() => {
        setShow(false);
      }}
    >
      <div className="trailer-container">
        <h1 className="trailer-title">{media_type} trailers</h1>

        <div className="trailer-content">
          {!trailers ? (
            <h1>Ko tìm thấy trailer</h1>
          ) : (
            trailers.map((trailer) => (
              <>
                <h1 className="trailer-name">{trailer.name}</h1>
                <iframe
                  width="460"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalTrailer;
