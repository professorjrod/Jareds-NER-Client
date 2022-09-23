import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const DatasetList = () => {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = () => {
    fetch("/datasets/show")
      .then((res) => res.json())
      .then((data) => setDatasets([datasets, ...data]))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>All datasets</h1>
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
              <Link className="underline px-2" to={`/datasets/${dataset.id}`}>
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
