import React, { useEffect } from "react";

const Keybutton = ({ tag, button, state, setState }) => {
  const [keyPressed, setKeyPressed] = React.useState(false);

  const handleKeyDown = (event) => {
    console.log("is mouse a key?");
    setKeyPressed(false);
    if (event.key === button) {
      setKeyPressed(true);
      setState((state) => ({ ...state, tag: tag }));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-24 h-24 rounded">
      <div
        className={
          "keybutton " +
          (keyPressed ? "bg-[#005577] rounded" : "bg-white rounded")
        }
      >
        <div className="text-[32px]">{button}</div>
        <h3>{tag}</h3>
      </div>
    </div>
  );
};

export default Keybutton;
