import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { TextAnnotator } from "react-text-annotate";
import Keybutton from "./Keybutton";
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

  useEffect(() => {
    console.log(state);
  }, [state]);
  //snake space bc of rails
  const formatAnnotations = () => {
    const annotationArray = state.value.map((annotation) => {
      return {
        selection_start: annotation.start,
        selection_end: annotation.end,
        tag: annotation.tag,
        text: annotation.text,
      };
    });
    return { dataset_text_id: id, annotations: annotationArray };
  };

  //Need to post the formated annotations with correct dataset text id
  //
  const handleSubmit = (e) => {
    fetch(`/texts/${id}/annotation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formatAnnotations()),
    })
      .then((res) => res.json())
      .then((data) => window.alert(`POSTED: ${JSON.stringify(data)}`))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Link className="breadcrumb" to={`/datasets/${text.dataset_id}`}>
        Back to dataset &raquo;
      </Link>
      <div className="flex">
        <div className="text-card">
          <div className="preview">
            <h1>
              <strong>Keybinds</strong>
            </h1>
            <div className="keybuttons flex space-x-21">
              <Keybutton tag="MAKE" button="1" setState={setState} />
              <Keybutton tag="MODEL" button="2" setState={setState} />
              <Keybutton tag="TRIM" button="3" setState={setState} />
              <Keybutton tag="YEAR" button="4" setState={setState} />
            </div>
            <h1>Currently annotating: {state.tag}</h1>
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
          <div className="submit" onClick={() => handleSubmit()}>
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
    </div>
  );
};

export default Annotate;
