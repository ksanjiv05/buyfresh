import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CustomInput from "../../molecules/CustomInput";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import "./account.css";
import FileDialog from "../../widget/FileDialog";
import Context from "../../../Context";
import Spinner from "../../../components/molecules/Spinner";
import WithToast from "../../../helper/WithToast";
import UserUtil from "../../../helper/StoreUsers";

const buttonTheam = {
  width: "100%",
  // marginLeft: "1.5%",
  marginTop: "3%",
  backgroundColor: "rgb(89, 6, 95)",
};
const AccountProfile = (props) => {
  const history = useHistory();
  const [loder, setLoder] = useState(false);
  const [loderx, setLoderx] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { auth, isAuthenticate } = useContext(Context);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("profile  data ", data);
    setIsUpdate(true);
  };

  const handleSave = async () => {
    console.log("save data ", data);
    setLoderx(true);

    data.uid = sessionStorage.getItem("uid");
    UserUtil.UpdateUser(data, (status) => {
      status
        ? props.success("You are updated successfully ")
        : props.error("Unable to update you ");
      setLoderx(false);
    });
    setIsUpdate(false);
  };

  useEffect(async () => {
    // auth.isSinghedIn();
    if (!isAuthenticate) history.push("/login");
    setLoder(true);

    console.log(loder, "user data", data);
    if (!sessionStorage.getItem("uid")) {
      console.log("uid empty");
      return;
    } else {
      const userData = await UserUtil.GetUser(sessionStorage.getItem("uid"));
      setData(userData);
      setImageUrl(data && data.photoURL);
    }
    setLoder(false);
  }, [isAuthenticate]);

  return loder ? (
    <Spinner />
  ) : (
    <div className="account-container">
      <div className="account-left">
        {/* <h1>Profile</h1> */}
        <div style={{ display: "contents" }}>
          <img
            // src={
            //   imageUrl && imageUrl.length > 5 ? imageUrl : data && data.photoURL
            // }
            src={
              auth.auth0.currentUser != null
                ? auth.auth0.currentUser.photoURL
                  ? auth.auth0.currentUser.photoURL
                  : ""
                : ""
            }
            // src="https://firebasestorage.googleapis.com/v0/b/buyfreshbro.appspot.com/o/Screenshot%20(16).png?alt=media&token=dcb8791e-df07-4f8e-ac82-72d0df96fd47"
            width="50%"
            height="50%"
            style={{ borderRadius: "100%" }}
          />
          <Button
            variant="contained"
            color="secondary"
            style={{
              margin: "4% 0% -20% -11%",
              backgroundColor: "rgb(89, 6, 95)",
            }}
            onClick={() => handleClickOpen()}
            startIcon={<EditIcon />}>
            Edit
          </Button>
          <FileDialog
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            success={props.success}
            error={props.error}
            auth={auth}
            setImageUrl={setImageUrl}
          />
        </div>
      </div>
      <div className="account-right">
        <div className="mobile-responsive">
          <CustomInput
            lable="First Name"
            name="first"
            placeholder="Enter your name"
            value={data && data.first}
            handleChange={handleChange}
          />
          <CustomInput
            lable="Last Name"
            name="last"
            value={data && data.last}
            placeholder="Enter your name"
            handleChange={handleChange}
          />
          <CustomInput
            lable="Contact Number"
            name="phoneNumber"
            nonEditable={true}
            value={sessionStorage.getItem("phoneNumber")}
            placeholder="Enter your number"
            handleChange={handleChange}
          />
          <CustomInput
            lable="Email"
            name="email"
            placeholder="Enter your email"
            value={data && data.email}
            handleChange={handleChange}
          />
          <Button
            variant="contained"
            color="secondary"
            style={buttonTheam}
            // className={classes.button}
            disabled={!isUpdate}
            onClick={handleSave}
            startIcon={<SaveIcon />}>
            SAVE
          </Button>

          <Button
            variant="contained"
            color="secondary"
            style={buttonTheam}
            onClick={() => history.push("/address")}
            // className={classes.button}
          >
            MY ADDRESSES
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={buttonTheam}
            // className={classes.button}
          >
            CHANGE PASSWORD
          </Button>
        </div>
      </div>
      {loderx ? <Spinner /> : ""}
    </div>
  );
};

export default WithToast(AccountProfile);
