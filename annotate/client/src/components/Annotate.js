import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { TextAnnotator } from "react-text-annotate";
import Keybutton from "./Keybutton";
import { BiRefresh } from "react-icons/bi";
import Confirm from "./Confirm";
const Annotate = () => {
  let { id } = useParams();
  let [text, setText] = useState({ text: "Loading..." });
  let [modal, setModal] = useState(false);
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

  const resetState = () => {
    setState({
      value: [],
      tag: "MAKE",
    });
    //Changes the color of the keybuttons
    document.querySelectorAll(".keybutton").forEach((component) => {
      component.classList.remove("bg-blue-500");
      component.classList.add("bg-white");
    });
  };

  const fetchData = () => {
    fetch(`/texts/${id}`)
      .then((res) => res.json())
      .then((data) => setText(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    //Need to highlist the keybutton for the current tag
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

    setModal(false);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    console.log("Here!");
    setModal(true);
  };

  useEffect(() => {
    modal
      ? document.querySelector(".confirm").classList.remove("hidden")
      : document.querySelector(".confirm").classList.add("hidden");
  }, [modal]);

  return (
    <div>
      <Confirm
        setModal={setModal}
        onSubmit={handleSubmit}
        state={state}
        text={text}
        TAG_COLORS={TAG_COLORS}
      />
      <Link className="breadcrumb" to={`/datasets/${text.dataset_id}`}>
        Back to dataset &raquo;
      </Link>
      <div className="flex">
        <div className="text-card">
          <div className="preview ">
            <h1>
              <strong>Keybinds</strong>
            </h1>
            {/* TODO fix delete annotations glitch*/}
            <div className="space-x-2 flex justify-center">
              <Keybutton tag="MAKE" button="1" setState={setState} />
              <Keybutton tag="MODEL" button="2" setState={setState} />
              <Keybutton tag="TRIM" button="3" setState={setState} />
              <Keybutton tag="YEAR" button="4" setState={setState} />
              <h1
                className="text-6xl m-auto hover:cursor-pointer"
                onClick={resetState}
              >
                <BiRefresh />
              </h1>
            </div>
            <h1>Choose a tag and highlight text to begin annotating.</h1>
            <TextAnnotator
              style={{
                maxWidth: 500,
                lineHeight: 1.5,
              }}
              content={text.text}
              value={state.value}
              onChange={(value) => setState({ ...state, value })}
              getSpan={(span) => ({
                ...span,
                tag: state.tag,
                color: TAG_COLORS[state.tag],
              })}
            />
          </div>
          {/* TODO make submit confirmation with annotation review */}
          <div className="submit" onClick={handleConfirm}>
            Preview Submit
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
