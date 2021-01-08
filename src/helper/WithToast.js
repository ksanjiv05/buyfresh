import React from "react";
import { useSnackbar } from "notistack";

const toastObj = {
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  autoHideDuration: 3000,
};

const WithToast = (OrginalComponent) => {
  const WithHOC = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const success = (msg) => {
      toastObj.variant = "success";
      enqueueSnackbar(msg, toastObj);
    };
    const error = (msg) => {
      toastObj.variant = "error";
      enqueueSnackbar(msg, toastObj);
    };
    return <OrginalComponent {...props} success={success} error={error} />;
  };
  return WithHOC;
};

export default WithToast;
