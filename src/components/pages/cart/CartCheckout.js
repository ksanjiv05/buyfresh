import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Address from "../account/address/Address";
import Addresses from "../account/address/Addresses";
import TimeSlot from "../../widget/TimeSlot";
import Payment from "../../widget/Payment";
import PlaceOrder from "./PlaceOrder";

const buttonTheam = {
  width: "100%",
  // marginLeft: "1.5%",
  color: "white",
  marginTop: "3%",
  backgroundColor: "rgb(89, 6, 95)",
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "96%",
    margin: "2% 2% 2% 2%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Select Delevery Address", "Choose Time Slot", "Payment"];
}

function getStepContent(stepIndex, handleChange) {
  switch (stepIndex) {
    case 0:
      return (
        <div>
          <Addresses handleChange={handleChange} />
        </div>
      );
    case 1:
      return (
        <div>
          <TimeSlot handleChange={handleChange} />
        </div>
      );
    case 2:
      return (
        <div>
          <Payment handleChange={handleChange} />
        </div>
      );
    default:
      return "Unknown stepIndex";
  }
}

export default function CartCheckout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState({});
  const steps = getSteps();

  const handleChange = (name, value) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = (value) => {
    console.log(activeStep, "the data value ", data);
    if (activeStep == 0 && data && data.address == null) {
      alert("please choose address");
      return;
    }
    if (activeStep == 1 && data && data.timeslot == null) {
      alert("please choose time slot");
      return;
    }
    if (activeStep == 2 && data && data.paymentMod == null) {
      alert("please choose payment");
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    alert("order placed");
    // setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="checkout-containt">
        {activeStep === steps.length ? (
          <div className="cart-final">
            <Typography className={classes.instructions}>
              <PlaceOrder data={data} />
            </Typography>
            <Button onClick={handleReset} style={buttonTheam}>
              Place Order
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep, handleChange)}
            </Typography>
            <div className="checkout-button">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}>
                Back
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "rgb(89, 6, 95)", color: "white" }}
                onClick={(ev) => handleNext(ev.target)}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
