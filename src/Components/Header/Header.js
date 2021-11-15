import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const hederRef = useRef(null);

  useEffect(() => {
    const handleFixedMenu = () => {
      window.scrollY > 80
        ? hederRef.current.classList.add("fixed")
        : hederRef.current.classList.remove("fixed");
    };

    window.addEventListener("scroll", handleFixedMenu);

    return () => {
      window.removeEventListener("scroll", handleFixedMenu);
    };
  }, []);

  return (
    <div ref={hederRef} className="header">
      <Link to="/" className="header-logo">
        <box-icon color="white" size="md" name="movie"></box-icon> PHIMMOI
      </Link>
      <Link className="header-search" to="/search">
        <box-icon size="md" color="white" name="search-alt-2"></box-icon>
      </Link>
    </div>
  );
}

export default Header;
