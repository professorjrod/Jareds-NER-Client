import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <div className="navbar flex">
    <div className="navbar-brand">
      <Link className="navbar-button" to="/">
        Annotator
      </Link>
    </div>

    <div className="navbar-start">
      <Link className="navbar-button" to="/">
        Guide
      </Link>
      <Link className="navbar-button" to="/datasets">
        Datasets
      </Link>
    </div>
  </div>
);

export default Navbar;
