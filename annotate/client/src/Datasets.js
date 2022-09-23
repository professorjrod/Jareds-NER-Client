import React from "react";
import { Link } from "react-router-dom";
import DatasetList from "./DatasetList";

const Datasets = () => {
  return (
    <div>
      <Link to="/">
        <DatasetList />
      </Link>
    </div>
  );
};

export default Datasets;
