import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const Show = () => {
  //useParams is a hook that allows us to access the id in the url
  const { id } = useParams();

  const [dataset, setDataset] = useState([]);
  const [filteredTexts, setFilteredTexts] = useState([]);
  //State variables for the filter checkboxes

  const [stats, setStats] = useState({
    annotated: 0,
    unannotated: 0,
    total: 0,
  });
  const [filter, setFilter] = useState({
    onlyShowAnnotated: false,
    onlyShowUnannotated: false,
  });
  const updateStatsFromDataset = () => {
    const annotated = dataset.texts.filter((text) => text.annotated).length;
    const unannotated = dataset.texts.filter((text) => !text.annotated).length;
    const total = dataset.texts.length;
    setStats({ annotated, unannotated, total });
  };

  useEffect(() => {
    if (id) {
      fetch(`/datasets/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDataset(data);
          setFilteredTexts(data.texts);
          updateStatsFromDataset();
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  useEffect(() => {
    setFilteredTexts(filterTexts());
    console.log(`filter changed`);
  }, [filter]);

  const filterTexts = (texts) => {
    if (filter.onlyShowAnnotated) {
      return dataset.texts.filter((text) => text.is_annotated);
    } else if (filter.onlyShowUnannotated) {
      return dataset.texts.filter((text) => !text.is_annotated);
    } else {
      return dataset.texts;
    }
  };
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
          <div className="text-card">{`${stats.annotated} of ${stats.total} annotated. ${stats.unannotated} remaining.`}</div>
          <div className="filters">
            <div
              className="navbar-button"
              onClick={() =>
                setFilter({
                  onlyShowAnnotated: false,
                  onlyShowUnannotated: false,
                })
              }
            >
              All
            </div>
            <div
              className="navbar-button"
              onClick={() =>
                setFilter({
                  onlyShowAnnotated: false,
                  onlyShowUnannotated: true,
                })
              }
            >
              Unannotated
            </div>
            <div
              className="navbar-button"
              onClick={() =>
                setFilter({
                  onlyShowAnnotated: true,
                  onlyShowUnannotated: false,
                })
              }
            >
              Annotated
            </div>
          </div>
          <Texts texts={filteredTexts} />
        </>
      )}
    </>
  );
};

const Texts = ({ texts }) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Text to annotate</th>
            <th>Annotated?</th>
          </tr>
        </thead>
        <tbody>
          {texts?.map((text) => (
            <tr key={text.id}>
              <td>{text.text.substr(0, 50) + "..."}</td>
              <td>{text.is_annotated ? "✓" : "✕"}</td>
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
};
export default Show;
