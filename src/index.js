import React from "react";
import ReactDOM from "react-dom";
import { Detector } from "react-detect-offline";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Detector
      render={({ online }) => (
        <div>{online ? <App /> : "Now you are offline"}</div>
      )}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
