import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_KEY, BASE_URL } from "../../constans";
import CastItem from "./CastItem";
import "./Cast.css";

function Cast() {
  const params = useParams();

  const { media_type, id } = params;

  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = (media_type, id) => {
      fetch(`${BASE_URL}/${media_type}/${id}/credits?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((cast) => {
          setCast(cast.cast.slice(0, 10));
        })
        .catch((err) => console.log(err));
    };

    getCast(media_type, id);
  }, [media_type, id]);

  return (
    <>
      <h3 className="cast-title">Cast</h3>
      <div className="cast">
        {cast.map((item) => (
          <CastItem data={item} key={item.cast_id} />
        ))}
      </div>
    </>
  );
}

export default Cast;
