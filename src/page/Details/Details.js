import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_KEY, BASE_URL } from "../../constans";
import Button from "../../Components/Button/Button";
import ReactStars from "react-rating-stars-component";
import "./Details.css";
import { Link } from "react-router-dom";
import Cast from "../Cast/Cast";
import Simular from "../../Components/Simular/Simular";
import ModalTrailer from "../../Components/Trailer/ModalTrailer";

function DetailsMovie() {
  const param = useParams();

  const { media_type, id } = param;

  const [data, setData] = useState({});

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getDetailsMovie = (media_type, id) => {
      fetch(`${BASE_URL}/${media_type}/${id}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((details) => {
          setData(details);
        })
        .catch((err) => console.log(err));
    };

    getDetailsMovie(media_type, id);
  }, [id, media_type]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id, media_type]);

  return (
    <div>
      <div
        className="details"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${
            data && data.backdrop_path
          })`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="details-container">
            <div className="details-poster">
              <img
                className="details-poster-img"
                src={`https://image.tmdb.org/t/p/w500${
                  data && data.poster_path
                }`}
                alt="poster"
              />
            </div>
            <div className="details-info">
              <h1 className="details-info-title">{data.name || data.title}</h1>
              <p className="details-info-overview">{data.overview}</p>
              <p className="release_date">
                {data.release_date
                  ? `Release date: ${data.release_date}`
                  : `Last episode: ${data.last_air_date}`}
              </p>
              <div className="genres">
                {data.genres &&
                  data.genres.map((item) => (
                    <Button key={item.id} content={item.name} />
                  ))}
              </div>
              <div className="ratings">
                <ReactStars
                  count={data && data.vote_average}
                  size={20}
                  color="#f1c40f"
                />{" "}
                <div className="ratings-count">{`(${data.vote_count} vote)`}</div>
              </div>

              <div className="watch">
                <Link
                  className="watch-link"
                  to={
                    media_type === "tv"
                      ? `/watch/tv/${id}/season/1/esp/1`
                      : `/watch/movie/${id}`
                  }
                >
                  Watch Now
                </Link>
                <span className="watch-link" onClick={() => setShowModal(true)}>
                  Watch Trailer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <p className="homepage">
          Homepage:{" "}
          <a className="homepage-link" href={data.homepage}>
            {data.homepage}
          </a>
        </p>

        <Cast />
        <Simular />
        {showModal ? (
          <ModalTrailer show={showModal} setShow={setShowModal} />
        ) : null}
      </div>
    </div>
  );
}

export default DetailsMovie;
