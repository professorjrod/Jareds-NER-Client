import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { TextAnnotator } from "react-text-annotate";
const Annotate = () => {
  let { id } = useParams();
  let [text, setText] = useState({ text: "Loading..." });
  let [state, setState] = useState({
    value: [],
    tag: "MAKE",
  });

  const TAG_COLORS = {
    MAKE: "#5050ef99",
    MODEL: "#71be71",
    YEAR: "#fa8585",
    TRIM: "#f4c56f",
  };

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
            <strong>Edit</strong>
          </h1>
          <select
            onChange={(e) => setState({ ...state, tag: e.target.value })}
            value={state.tag}
          >
            <option value="MAKE">MAKE</option>
            <option value="MODEL">MODEL</option>
            <option value="YEAR">YEAR</option>
            <option value="TRIM">TRIM</option>
          </select>
          <h1>Selection: {state.tag}</h1>
          <TextAnnotator
            style={{
              maxWidth: 500,
              lineHeight: 1.5,
            }}
            content={text.text}
            value={state.value}
            onChange={(value) => setState({ value })}
            getSpan={(span) => ({
              ...span,
              tag: state.tag,
              color: TAG_COLORS[state.tag],
            })}
          />
        </div>
        <div
          className="border-2 min-w-fit p-2 hover:cursor-pointer"
          onClick={() => console.error(state)}
        >
          Submit
        </div>
      </div>

      <div className="text-card">
        <div className="editor">
          <h1>
            <strong>Raw</strong>
          </h1>
          <pre className="py-2">{JSON.stringify(state, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default Annotate;
