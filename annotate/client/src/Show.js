import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const Show = () => {
  //useParams is a hook that allows us to access the id in the url
  const { id } = useParams();

  const [dataset, setDataset] = useState([]);

  //State variables for the filter checkboxes

  const [filter, setFilter] = useState({
    onlyShowAnnotated: false,
    onlyShowUnannotated: false,
  });

  const [stats, setStats] = useState({
    annotated: 0,
    unannotated: 0,
    total: 0,
  });

  useEffect(() => {
    if (id) {
      fetch(`/datasets/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDataset(data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

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
  <>
    <div className="filters">
      <div className="navbar-button ">All</div>
      <div className="navbar-button ">Unannotated</div>
      <div className="navbar-button">Annotated</div>
    </div>
    <table className="table">
      <thead>
        <tr>
          <th>Annotation list</th>
        </tr>
      </thead>
      <tbody>
        {texts?.map((text) => (
          <tr key={text.id}>
            <td>{text.text.substr(0, 50) + "..."}</td>
            <td>
              <Link className="breadcrumb" to={`/annotate/${text.id}`}>
                Annotate &raquo;
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);
export default Show;
