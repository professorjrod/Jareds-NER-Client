import React, { useState } from "react";

const Demo = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const onSubmit = (e) => {
    fetch("/demo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResult(data);
      });
  };

  const highlightTextFromResult = () => {
    let highlightedText = text.split(" ");
    const randomColor = () =>
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

    highlightedText = highlightedText.map((word) => {
      if (result.tokens.includes(word)) {
        console.log("math");
        return (
          <span
            style={{
              backgroundColor: randomColor(),
              padding: "0 5px",
            }}
          >
            {word}
            <span className="tag-span">
              {result.labels[result.tokens.indexOf(word)]}
            </span>
          </span>
        );
      } else {
        return ` ${word} `;
      }
    });
    console.log(highlightedText);
    return highlightedText;
  };
  return (
    <div className="w-full flex flex-col">
      <textarea
        className="text-black m-auto w-1/2 h-64 mt-6"
        placeholder="This is a demo of the Annotator. It uses the Spacy NLP library to
        extract entities from text. You can use the Annotator to annotate your
        own text and train your own NLP models. The demo is trained on the english language from various periodicals"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button className="navbar-button mt-2 m-auto" onClick={onSubmit}>
        Submit
      </button>
      <div className="text-card">
        <div className="preview h-auto">
          {result.length !== 0 ? (
            <p>{highlightTextFromResult()}</p>
          ) : (
            <p>Submit some text to analyze to get started.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;
