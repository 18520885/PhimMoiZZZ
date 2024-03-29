import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../../constans";
import MovieItem from "../../Components/Movie/MovieItem";
import Skeleton from "../../Components/Skeleton/Skeleton";
import "./ViewMorePage.css";
import "boxicons";

function ViewMorePage() {
  const params = useParams();

  const { media_type, type } = params;

  const [movie, setMovie] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState();

  const [loading, setLoading] = useState(false);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const LoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const getViewMore = (media_type, type) => {
      let apiViewMore = "";
      if (type === "trending") {
        apiViewMore = `${BASE_URL}/${type}/${media_type}/week?api_key=${API_KEY}&page=${page}`;
      } else {
        apiViewMore = `${BASE_URL}/${media_type}/${type}?api_key=${API_KEY}&page=${page}`;
      }

      if (apiViewMore) {
        fetch(`${apiViewMore}`)
          .then((res) => res.json())
          .then((data) => {
            setMovie([...movie, ...data.results]);
            setTotalPage(data.total_pages);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
    };

    setLoading(true);
    getViewMore(media_type, type);
  }, [page]);

  return (
    <div className="container">
      <div className="view_more">
        <h1 className="view_more-title">
          {media_type} {type}
        </h1>

        <div className="grid-layout grid-gap-20px-20px grid-layout">
          {!loading ? (
            movie.map((item) => (
              <Link key={item.id} to={`/details/${media_type}/${item.id}`}>
                <MovieItem data={item} />
              </Link>
            ))
          ) : (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )}
        </div>
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
          </div>
        ) : page < totalPage ? (
          <div onClick={LoadMore} className="load-more">
            <button className="load-more-button">Load More</button>
          </div>
        ) : null}
      </div>

      <div className="scrollTop" onClick={scrollTop}>
        <box-icon size="sm" color="white" type="solid" name="to-top"></box-icon>
      </div>
    </div>
  );
}

export default ViewMorePage;
