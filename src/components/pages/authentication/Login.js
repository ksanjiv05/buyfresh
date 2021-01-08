import React from "react";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import image from "../account/cool-background (1).png";
import PhoneAuth from "../../molecules/PhoneAuth";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const buttonTheam = {
  width: "100%",
  marginTop: "3%",
  backgroundColor: "rgb(89, 6, 95)",
};
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Login(props) {
  // const [data, setData] = useState({});

  const history = useHistory();

  // signInWithEmailPassword
  // const handleChange = (ev) => {
  //   const { name, value } = ev.target;
  //   console.log(value, data);
  //   setData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleEmailPasswordAuth = () => {
  //   console.log("email", data);

  //   auth.signInWithEmailPassword(data.Email, data.Password, (status) => {
  //     console.log("singed email", status);
  //     let msg = status ? "You are successfully loged in" : "Loged in failed";
  //     status ? (toastObj.variant = "success") : (toastObj.variant = "error");
  //     enqueueSnackbar(msg, toastObj);
  //   });
  // };

  // const emailregx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <div>
      <Dialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Login
        </DialogTitle>
        <DialogContent dividers>
          <div className="reg">
            <div
              style={{
                width: "50%",
                height: "100%",
                // backgroundImage: "url('../account/cool-background (1).png')",
              }}>
              <img src={image} alt="icon" className="reg-image" />
            </div>
            <div style={{ width: "50%", height: "100%", float: "right" }}>
              {/* <InputWithoutIcon
                lable="Email"
                placeholder="Enter your email"
                isError={emailregx.test(data.Email) ? false : true}
                errorMsg={
                  emailregx.test(data.Email) ? "" : "Please Enter valid Email"
                }
                handleChange={handleChange}
              />
              <InputWithoutIcon
                lable="Password"
                isError={data.Password && data.Password.length < 8}
                errorMsg={
                  data.Password && data.Password.length < 8
                    ? "Please Enter valid password"
                    : ""
                }
                placeholder="Enter your password"
                handleChange={handleChange}
              />
              <p className="forget-password">forget password ?</p>
              <Button
                variant="contained"
                color="secondary"
                style={buttonTheam}
                onClick={handleEmailPasswordAuth}
                // className={classes.button}
                // startIcon={<SaveIcon />}
              >
                LOGIN
              </Button> */}

              <center>{/* <Typography variant="h6">OR</Typography> */}</center>
              <PhoneAuth btnMsg={"LOGIN WITH OTP"} />
              <Button
                variant="contained"
                color="secondary"
                style={buttonTheam}
                onClick={() => {
                  history.push("/reg");
                  props.handleClose();
                }}
                // className={classes.button}
                // startIcon={<SaveIcon />}
              >
                New ? Create an account
              </Button>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
