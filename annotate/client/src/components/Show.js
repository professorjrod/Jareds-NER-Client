import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Texts from "./Texts";
const Show = () => {
  const { id } = useParams();

  const [dataset, setDataset] = useState({ title: "Loading...", texts: [] });
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
    const annotated = dataset.texts.filter((text) => text.is_annotated).length;
    const unannotated = dataset.texts.filter(
      (text) => !text.is_annotated
    ).length;
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
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  //no more double click ;-D
  useEffect(() => {
    updateStatsFromDataset();
  }, [dataset]);

  useEffect(() => {
    setFilteredTexts(filterTexts());
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

export default Show;
