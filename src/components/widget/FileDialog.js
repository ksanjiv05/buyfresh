import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "../../config/firebase";

const FileDialog = (props) => {
  const [image, setImage] = React.useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];

    console.log("img size ", file.size);
    setImage((imageFile) => file);
  };
  const updateProfile = () => {
    if (image.size / 1024 > 150) {
      props.error("file size do not be greater then 150kb");
      return;
    }
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(image.name);
    fileRef
      .put(image)
      .then((v) => {
        console.log("Uploaded a file", v.metadata, "---", v.totalBytes);
        v.ref.getDownloadURL().then(async (dw) => {
          const data = { photoURL: dw, uid: sessionStorage.getItem("uid") };
          //UserUtil.UpdateUser
          props.auth.updateProfile(data, (status) => {
            if (status) {
              props.setImageUrl(dw);
              props.success("You are updated successfully ");
            } else {
              props.error("Unable to update you ");
            }
          });
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Profile Pic Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update profile pic to this website, please enter your pic address
            here. We will update automatically.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={(e) => handleChange(e)}
            label="Profile Image"
            type="file"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
          <Button onClick={updateProfile} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FileDialog;
