import React from "react";
import { useEffect } from "react";
import { TextAnnotator } from "react-text-annotate";
const Confirm = ({ setModal, onSubmit, state }) => {
  return (
    <div className="confirm">
      <div className="blur rounded-sm w-screen min-h-screen absolute bottom-2 top-4 bg-gray-900 opacity-90 flex z-10"></div>
      <div className="flex z-20 text-black w-screen h-screen absolute justify-center">
        <div className="m-auto flex w-1/2 h-[50%] bg-[#ECE8E8] z-20">
          {" "}
          <div
            className="w-8 h-8 bg-[red] relative bottom-2 right-2 text-2xl text-center rounded hover:bg-red-500 hover:cursor-pointer"
            onClick={() => setModal(false)}
          >
            X
          </div>
          <div className="h-auto overflow-hidden w-auto">
            {JSON.stringify(state, null, 2)}
          </div>
          <div className=" w-fit mt-auto mx-auto mb-2">
            <div className=" submit b-2 border-black" onClick={onSubmit}>
              <h1> | Are you sure you want to submit? | </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
