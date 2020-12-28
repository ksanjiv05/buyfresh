import React from "react";

import TextField from "@material-ui/core/TextField";

const InputWithoutIcon = ({
  lable,
  placeholder,
  handleChange,
  isError,
  errorMsg,
}) => {
  return (
    <div>
      <TextField
        error={isError}
        helperText={errorMsg}
        label={lable}
        // style={{ margin: 8 }}
        name={lable}
        placeholder={placeholder}
        fullWidth
        onChange={(ev) => handleChange(ev)}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};

export default InputWithoutIcon;
