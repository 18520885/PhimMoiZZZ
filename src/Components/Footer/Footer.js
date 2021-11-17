import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <p className="footer-name">Nguyen Quoc An</p>
      <p className="footer-contact">
        <box-icon color="white" size="md" type="logo" name="github"></box-icon>
        <box-icon
          color="white"
          size="md"
          type="logo"
          name="facebook-circle"
        ></box-icon>
        <box-icon color="white" size="md" name="youtube" type="logo"></box-icon>
      </p>
    </div>
  );
}

export default Footer;
