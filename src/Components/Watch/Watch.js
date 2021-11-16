import { computeHeadingLevel } from "@testing-library/dom";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { BASE_URL, API_KEY } from "../../constans";

function Watch() {
  const params = useParams();

  const { esp, season, id } = params;

  const [seasonTv, setSeasonTv] = useState(season);

  const [espTv, setEspTv] = useState(esp);

  const [seasonData, setSeasonData] = useState([]);

  const [espData, setEspData] = useState([]);

  const [seasonCurrent, setSeasonCurrent] = useState();

  useEffect(() => {
    setEspTv(esp);
    setSeasonTv(season);
  }, [esp, season]);

  useEffect(() => {
    const getInfoTv = (id) => {
      fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          setSeasonData(data.seasons);
        });
    };

    getInfoTv(id);
  }, []);

  const getEsp = (season, id) => {
    setEspData([]);

    fetch(`${BASE_URL}/tv/${id}/season/${season}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setEspData(data.episodes);
        setSeasonCurrent(data.season_number);
      });
  };

  return (
    <div className="container">
      <div className="watch-tv-container">
        <div className="watch-tv">
          <iframe
            src={`https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${seasonTv}&e=${espTv}`}
            frameborder="0"
            title="tvShow"
            width="100%"
            height="600"
          />
        </div>
        <div className="watch-tv-other-season">
          {seasonData.map((item) => (
            <div
              onClick={() => getEsp(item.season_number, id)}
              className="watch-tv-season"
              key={item.id}
            >
              <div className="watch-tv-link">
                <img
                  className="watch-tv-season-img"
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
                  }
                  alt={item.name}
                />
                <div className="info-esp-season">
                  <p className="watch-tv-season-name">{item.name}</p>
                  <p className="watch-tv-esp-count">
                    {item.episode_count} episode
                  </p>
                </div>
              </div>
              {item.season_number === seasonCurrent
                ? espData.map((esp) => (
                    <NavLink
                      to={`/watch/tv/${id}/season/${seasonCurrent}/esp/${esp.episode_number}`}
                      className="esp-list"
                      activeClassName="active"
                    >
                      <div className="esp-item">
                        <img
                          src={
                            esp.still_path
                              ? `https://image.tmdb.org/t/p/w500${esp.still_path}`
                              : "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
                          }
                          alt={esp.name}
                          className="esp-item-img"
                        />
                        <p className="esp-item-name">
                          Episode {esp.episode_number}
                        </p>
                      </div>
                    </NavLink>
                  ))
                : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Watch;
