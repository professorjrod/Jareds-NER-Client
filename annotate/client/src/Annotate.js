import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const Annotate = () => {
  let { id } = useParams();

  let [text, setText] = useState("");

  useEffect(() => {
    fetch(`/texts/${id}`)
      .then((res) => res.json())
      .then((data) => setText(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex">
      <Link className="breadcrumb" to={`/datasets/${text.dataset_id}`}>
        Back to dataset &raquo;
      </Link>
      <div className="text-card">
        <div className="preview">
          <h1>
            <strong>Preview</strong>
          </h1>
          <p>{text.text}</p>
        </div>
      </div>
      <div className="text-card">
        <div className="editor">
          <h1>
            <strong>Edit</strong>
          </h1>
          <p>{text.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Annotate;
