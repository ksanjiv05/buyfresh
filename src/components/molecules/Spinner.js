import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./popup.css";

export default function Spinner() {
  return (
    // <div className="loader center">
    <div className="popup-container">
      <div className="icon-container">
        <CircularProgress disableShrink />
      </div>
    </div>
    // </div>
  );
}
