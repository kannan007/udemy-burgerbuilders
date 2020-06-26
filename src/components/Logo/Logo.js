import React from "react";
import LogoPic from "../../assets/images/burger-logo.png";

import classes from "./Logo.module.css";

const logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={LogoPic} alt="logo" />
  </div>
);

export default logo;
