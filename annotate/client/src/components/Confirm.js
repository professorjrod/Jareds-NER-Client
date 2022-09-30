import React from "react";
import { useEffect } from "react";
import { TextAnnotator } from "react-text-annotate";
const Confirm = ({ setModal, onSubmit, state, text, TAG_COLORS }) => {
  const highlightAnnotatedText = () => {
    const innerText = [];
    const highlightedText = state.value.map((annotation) => {
      innerText.push(annotation.text);
      return (
        <span
          style={{
            backgroundColor: TAG_COLORS[annotation.tag],
            padding: "0 5px",
          }}
        >
          {annotation.text}
          <span className="tag-span">{annotation.tag}</span>
        </span>
      );
    });
    return text.text.split(" ").map((word) => {
      if (innerText.includes(word)) {
        return highlightedText[innerText.indexOf(word)];
      } else {
        return word + " ";
      }
    });
  };

  return (
    <div className="confirm">
      <div className="confirm-blur"></div>
      <div className="confirm-container">
        <div className="confirm-card">
          {" "}
          <div className="confirm-close" onClick={() => setModal(false)}>
            X
          </div>
          <div className="confirm-preview">{highlightAnnotatedText()}</div>
          <div className="flex p-6">
            <div
              className="submit b-2 border-black h-12 w-24 mx-auto relative"
              onClick={onSubmit}
            >
              <h1> Submit </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
