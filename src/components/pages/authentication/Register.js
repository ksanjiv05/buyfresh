// import React, { useState, useContext } from "react";
// import Button from "@material-ui/core/Button";
// import SaveIcon from "@material-ui/icons/Save";
// // import Facebook from "@material-ui/icons/";
// import InputWithoutIcon from "../../molecules/InputWithoutIcon";
// import { Progress } from "react-sweet-progress";
// import "react-sweet-progress/lib/style.css";
// import firebase from "../../../config/firebase";
// import Context from "../../../Context";
// import Valid from "../../../helper/Validation";
// import { useSnackbar } from "notistack";

// const buttonTheam = {
//   width: "100%",

//   marginTop: "3%",
//   backgroundColor: "rgb(89, 6, 95)",
// };
// const toastObj = {
//   anchorOrigin: {
//     vertical: "top",
//     horizontal: "center",
//   },
//   autoHideDuration: 3000,
// };
// const Register = () => {
//   const [data, setData] = useState({});
//   const [isErrors, setIsErrors] = useState(true);
//   const [progress, setProgress] = useState(1);
//   const { enqueueSnackbar } = useSnackbar();
//   const { auth } = useContext(Context);

//   const handleChange = (ev) => {
//     const { name, value } = ev.target;
//     console.log(value, data);
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     console.log("iserror ", isErrors);
//     let iser = true;
//     for (let key in data) {
//       iser = Valid(key, data[key]);
//       if (iser) break;
//       //setIsErrors(st);
//     }

//     if (iser) {
//       toastObj.variant = "error";
//       enqueueSnackbar("Please enter valid data ", toastObj);
//       return;
//     }
//     const db = firebase.firestore();
//     console.log(db);
//     db.collection("users")
//       .add({ fname: data.First, lname: data.Last })
//       .then((doc) => {
//         console.log(doc);
//         setProgress(2);
//         setData({});
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };
//   const handleEmailSave = () => {
//     console.log("email", data);

//     for (let key in data) {
//       setIsErrors(Valid(key, data[key]));
//     }
//     console.log("iserror ", isErrors);
//     if (isErrors) {
//       toastObj.variant = "error";
//       enqueueSnackbar("Please enter valid data ", toastObj);
//       return;
//     }
//     try {
//       auth.createEmailAndPassword(data.Email, data.Passwrod, (v) => {
//         console.log("created email", v);
//       });
//     } catch (error) {
//       toastObj.variant = "error";
//       enqueueSnackbar("Please enter valid data ", toastObj);
//     }
//   };
//   const emailregx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return (
//     <div className="account-container">
//       <div className="account-left"></div>
//       <div className="account-right">
//         <div style={{ padding: 15, paddingTop: "16%" }}>
//           <div className="progress-div">
//             <Progress
//               percent={50 * progress}
//               // status="success"
//               theme={{
//                 success: {
//                   color: "rgb(89, 6, 95)",
//                 },
//               }}
//             />
//           </div>
//           {/* <Button
//           variant="contained"
//           color="secondary"
//           style={buttonTheam}
//           // className={classes.button}
//           onClick={() =>
//             auth.signInWithGoogle(new firebasex.auth.GoogleAuthProvider())
//           }
//           startIcon={<SaveIcon />}>
//           Login With GOOGLE
//         </Button>
//         <Button
//           variant="contained"
//           color="secondary"
//           style={buttonTheam}
//           // className={classes.button}
//           onClick={() =>
//             auth.signInWithFacebook(new firebasex.auth.FacebookAuthProvider())
//           }
//           startIcon={<Facebook />}>
//           Login With FACEBOOK
//         </Button> */}
//           {progress === 1 ? (
//             <>
//               <InputWithoutIcon
//                 lable="First"
//                 placeholder="Enter the first name"
//                 isError={data.First && data.First.length < 3}
//                 errorMsg={
//                   data.First && data.First.length < 3
//                     ? "Please Enter valid first name"
//                     : ""
//                 }
//                 setIsErrors={setIsErrors}
//                 handleChange={handleChange}
//               />
//               <InputWithoutIcon
//                 lable="Last"
//                 placeholder="Enter the last name"
//                 isError={data.Last && data.Last.length < 3}
//                 errorMsg={
//                   data.Last && data.Last.length < 3
//                     ? "Please Enter valid last name"
//                     : ""
//                 }
//                 setIsErrors={setIsErrors}
//                 handleChange={handleChange}
//               />
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 style={buttonTheam}
//                 // className={classes.button}
//                 onClick={handleSave}
//                 startIcon={<SaveIcon />}>
//                 SAVE & NEXT
//               </Button>
//             </>
//           ) : (
//             <>
//               <InputWithoutIcon
//                 lable="Email"
//                 placeholder="Enter the email"
//                 isError={emailregx.test(data.Email) ? false : true}
//                 errorMsg={
//                   emailregx.test(data.Email) ? "" : "Please Enter valid Email"
//                 }
//                 handleChange={handleChange}
//               />
//               <InputWithoutIcon
//                 lable="Passwrod"
//                 placeholder="Enter the last Password"
//                 isError={data.Password && data.Password.length < 8}
//                 errorMsg={
//                   data.Password && data.Password.length < 8
//                     ? "Please Enter valid password"
//                     : ""
//                 }
//                 handleChange={handleChange}
//               />
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 style={buttonTheam}
//                 // className={classes.button}
//                 onClick={handleEmailSave}
//                 startIcon={<SaveIcon />}>
//                 Create
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
