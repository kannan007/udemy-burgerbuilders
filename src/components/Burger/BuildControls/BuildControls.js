import React from "react";

import classes from "./BuildControls.module.css";

import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price is {props.total}</p>
    {controls.map((x) => (
      <BuildControl
        key={x.label}
        added={props.ingredientAdded}
        remove={props.ingredientRemove}
        disabled={props.disabledInfo[x.type]}
        label={x.label}
        type={x.type}
      ></BuildControl>
    ))}
    <button
      onClick={props.ordered}
      disabled={props.total <= 4}
      className={classes.OrderButton}
    >
      Order Now
    </button>
  </div>
);

export default buildControls;
