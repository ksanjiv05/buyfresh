import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import FileUploadHelper from "../../../helper/FileUploadHelper";

const ProductImageUpload = (props) => {
  const [isUpload, setIsUpload] = useState(false);
  const [image, setImage] = React.useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log("img size ", file.size);
    setImage((imageFile) => file);
    setIsUpload(false);
  };
  const UploadImage = () => {
    if (!image) {
      alert("please choose image");
      return;
    }
    if (image.size / 1024 > 150) {
      console.log("file size do not be greater then 150kb");
      return;
    }
    FileUploadHelper.UploadImage(image, (v) => {
      v.status
        ? console.log("file uploaded ", v.url)
        : console.log("Upload failed");
      setIsUpload(true);
      props.setImgUrl(v.url);
    });
  };
  return (
    <div>
      <div style={{ width: "85%", float: "left" }}>
        <TextField
          label="Product Image *"
          type="file"
          name="pimg"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => handleChange(e)}
          margin="normal"
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ width: "8%", float: "right", marginTop: "1%" }}>
        <IconButton
          aria-label="toggle password visibility"
          onClick={UploadImage}
          // onMouseDown={handleMouseDownPassword}
        >
          {isUpload ? (
            <CloudDoneIcon fontSize="large" />
          ) : (
            <CloudUploadIcon fontSize="large" />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default ProductImageUpload;
