import React from "react";
import { Link } from "react-router-dom";
const Texts = ({ texts }) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Text to annotate</th>
            <th>Annotated?</th>
          </tr>
        </thead>
        <tbody>
          {texts?.map((text) => (
            <tr key={text.id}>
              <td>{text.text.substr(0, 50) + "..."}</td>
              <td>{text.is_annotated ? "✓" : "✕"}</td>
              <td>
                <Link className="breadcrumb" to={`/annotate/${text.id}`}>
                  Annotate &raquo;
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Texts;
