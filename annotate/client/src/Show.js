import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const Show = () => {
  //useParams is a hook that allows us to access the id in the url
  const { id } = useParams();

  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`/datasets/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDataset(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <Link to="/datasets" className="breadcrumb">
        &laquo; All Datasets
      </Link>
      {dataset === {} ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="title">{dataset.title}</h2>
          <Texts texts={dataset.texts} />
        </>
      )}
    </>
  );
};

const Texts = ({ texts }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Summary</th>
      </tr>
    </thead>
    <tbody>
      {texts?.map((text) => (
        <tr key={text.id}>
          <td>{text.text.substr(0, 50) + "..."}</td>
          <td>
            <Link
              className="underline px-2 text-blue-500"
              to={`/annotate/${text.id}`}
            >
              Annotate &raquo;
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
export default Show;
