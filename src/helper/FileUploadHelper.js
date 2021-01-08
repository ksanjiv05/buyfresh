import firebase from "../config/firebase";

import { v4 as uuidv4 } from "uuid";
const db = firebase.firestore();

const FileUploadHelper = {
  UploadImage: async function UploadImage(data, callback) {
    const imgname = uuidv4() + data.name;
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(imgname);
    fileRef
      .put(data)
      .then((v) => {
        console.log("Uploaded a file", v.metadata, "---", v.totalBytes);
        v.ref
          .getDownloadURL()
          .then(async (dw) => {
            console.log("image url", dw);
            callback({ status: true, url: dw });
          })
          .catch((err) => {
            console.log("err", err);
            callback({ status: false, url: "" });
          });
      })
      .catch((err) => {
        console.log("err", err);
        callback({ status: false, url: "" });
      });
  },
};

export default FileUploadHelper;
