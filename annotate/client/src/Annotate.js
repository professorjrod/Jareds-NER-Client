import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { TokenAnnotator } from "react-text-annotate";
const Annotate = () => {
  let { id } = useParams();
  let [text, setText] = useState({ text: "Loading..." });
  let [state, setState] = useState({
    value: [{ start: null, end: null, tag: "MAKE" }],
    tag: "MAKE",
  });

  const TAG_COLORS = {
    MAKE: "blue",
    MODEL: "green",
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
          <select
            onChange={(e) => setState({ ...state, tag: e.target.value })}
            value={state.tag}
          >
            <option value="MAKE">MAKE</option>
            <option value="MODEL">MODEL</option>
          </select>
          <h1>
            <strong>Preview</strong>
          </h1>
          <TokenAnnotator
            style={{
              maxWidth: 500,
              lineHeight: 1.5,
            }}
            tokens={text.text.split(" ")}
            value={state.value}
            onChange={(value) => setState({ value })}
            getSpan={(span) => ({
              ...span,
              tag: state.tag,
              color: TAG_COLORS[state.tag],
            })}
          />
        </div>
        <button onClick={() => console.error(state)}>Submit</button>
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
