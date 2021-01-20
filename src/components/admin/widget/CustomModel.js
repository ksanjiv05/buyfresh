import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({ open, handleClose, body }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  // const body = (
  //   <div style={modalStyle} className={classes.paper}>
  //     <h2 id="simple-modal-title">Text in a modal</h2>
  //     <div>
  //       <InputWithoutIcon
  //         isError={data.stock.length < 1}
  //         errorMsg={data.stock.length < 1 ? "please enter valid stock" : ""}
  //         lable="Product Stock *"
  //         name="stock"
  //         placeholder="Enter the stock of product"
  //         handleChange={handleChange}
  //       />
  //       <div>
  //         <div style={{ width: "85%", float: "left" }}>
  //           <InputWithoutIcon
  //             isError={data.price.length < 1}
  //             errorMsg={
  //               data.price.length < 1 ? "please enter valid product price" : ""
  //             }
  //             lable="Product Price "
  //             name="price"
  //             placeholder="Enter the price per product"
  //             handleChange={handleChange}
  //           />
  //         </div>
  //         <div className="unit-list">
  //           <SelectList
  //             label="Unit"
  //             isError={data.unit.length < 1}
  //             handleChange={handleChange}
  //             name="unit"
  //             list={["1kg", "1pc", "250gm", "200gm", "500gm", "750gm"]}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div style={modalStyle} className={classes.paper}>
          {body}
        </div>
      </Modal>
    </div>
  );
}
