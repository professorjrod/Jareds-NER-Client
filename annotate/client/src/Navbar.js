import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <div className="navbar flex">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/">
        Annotator
      </Link>
    </div>

    <div className="navbar-start">
      <Link className="navbar-item" to="/">
        Home
      </Link>
      <Link className="navbar-item" to="/datasets">
        Datasets
      </Link>
    </div>
  </div>
);

export default Navbar;
