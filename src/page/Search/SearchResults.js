import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../../Components/Skeleton/Skeleton";
import { BASE_URL, API_KEY } from "../../constans";

function SearchResults() {
  const params = useParams();

  const { keyword } = params;

  const [results, setResults] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState();

  const [loading, setLoading] = useState(true);

  const LoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const searchKeywordforUser = (keyword) => {
      fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${keyword}&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTotalPage(data.total_pages);
          setResults([...results, ...data.results]);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };

    setLoading(true);

    searchKeywordforUser(keyword);
  }, [page]);

  return (
    <div className="container">
      <div className="searchResults">
        <h1 className="searchResults-title">Results for {`"${keyword}"`}</h1>
        <div className="searchResults-container">
          {!loading ? (
            results.map((result) => (
              <Link
                key={result.id}
                to={`/details/${result.media_type}/${result.id}`}
              >
                <div className="movie-item">
                  <img
                    className="image-slider"
                    src={
                      result.poster_path
                        ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                        : "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
                    }
                    alt={result.original_title}
                  />

                  <p className="movie-title">{result.title || result.name}</p>
                </div>
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
            </>
          )}
        </div>
      </div>
      {page < totalPage ? (
        <div onClick={LoadMore} className="load-more">
          <button className="load-more-button">Load More</button>
        </div>
      ) : null}
    </div>
  );
}

export default SearchResults;
