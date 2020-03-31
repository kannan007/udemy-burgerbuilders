import React from "react";
import "./Char.css";

function char(props) {
  return (
    <div onClick={event => props.changed(event, props.index)} className="char">
      <p>{props.char}</p>
    </div>
  );
}

export default char;
