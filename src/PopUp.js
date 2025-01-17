import React, { useEffect, useState } from "react";
import firebase from "./config/firebase";
const db = firebase.firestore();

const PopUp = () => {
  const [close, setClose] = React.useState(false);
  const [data, setData] = useState({});
  useEffect(async () => {
    const docRef = db.collection("UpdateApp").doc("1Qc3M6Ym2vEFq6X5yezC");
    try {
      const doc = await docRef.get();
      if (doc.exists) {
        setData(doc.data());
      }
    } catch (err) {
      //console.log(err);
    }
  }, []);
  return (
    <div style={{ display: data && data.isShow ? "block" : "none" }}>
      <div
        className="first-window"
        style={{ display: close ? "none" : "block" }}>
        <div className="first-window-close" onClick={() => setClose(true)}>
          X
        </div>
        <div
          className="download"
          onClick={() => (window.location.href = data && data.apk)}>
          <img src={data && data.apklinkimg} className="download-img" />
        </div>
      </div>
    </div>
  );
};

export default PopUp;
