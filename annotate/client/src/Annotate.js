import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { TextAnnotator } from "react-text-annotate";
const Annotate = () => {
  let { id } = useParams();

  let [text, setText] = useState("");

  let [annotations, setAnnotations] = useState({
    value: [{ start: 0, end: 0, tag: "" }],
    tag: "",
  });

  useEffect(() => {
    fetch(`/texts/${id}`)
      .then((res) => res.json())
      .then((data) => setText(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(annotations);
  return (
    <div className="flex">
      <Link className="breadcrumb" to={`/datasets/${text.dataset_id}`}>
        Back to dataset &raquo;
      </Link>
      <div className="text-card">
        <div className="preview">
          <select
            onChange={(e) =>
              setAnnotations({ ...annotations, tag: e.target.value })
            }
            value={annotations.tag}
          >
            <option value="Make">Make</option>
            <option value="Model">Model</option>
          </select>
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
