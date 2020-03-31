import React from "react";

function validation(props) {
  let displayText = (
    <div>
      <p>Too short</p>
    </div>
  );
  if (props.textValue && props.textValue.length > 5) {
    displayText = (
      <div>
        <p>Ok </p>
      </div>
    );
  }
  return displayText;
}

export default validation;
