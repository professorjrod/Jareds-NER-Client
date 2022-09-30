import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const DatasetList = () => {
  const [datasets, setDatasets] = useState([{ title: "Loading..." }]);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = () => {
    fetch("/datasets/index")
      .then((res) => res.json())
      .then((data) => setDatasets(data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Items items={datasets} />
    </div>
  );
};

const Items = ({ items }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {items.map((dataset) => (
          <tr key={dataset.id}>
            <td>{dataset.title}</td>
            <td>
              <Link className="breadcrumb" to={`/datasets/${dataset.id}`}>
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default DatasetList;
