import React from "react";
import download from "./download_button-removebg-preview.png";

const PopUp = () => {
  const [close, setClose] = React.useState(false);
  return (
    <div className="first-window" style={{ display: close ? "none" : "block" }}>
      <div className="first-window-close" onClick={() => setClose(true)}>
        X
      </div>
      <div
        className="download"
        onClick={() =>
          (window.location.href =
            "https://firebasestorage.googleapis.com/v0/b/buyfreshbro.appspot.com/o/app-release.apk?alt=media&token=c53574e0-abba-43f8-925e-b5f17b54ba17")
        }>
        <img src={download} className="download-img" />
      </div>
    </div>
  );
};

export default PopUp;
