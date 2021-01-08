import React from "react";

import TextField from "@material-ui/core/TextField";

const InputWithoutIcon = ({
  lable,
  value,
  name,
  placeholder,
  handleChange,
  isDesable,
  isError,
  errorMsg,
  inputProps,
}) => {
  name = name == undefined || name == null ? lable : lable && name;
  return (
    <div>
      <TextField
        error={isError}
        helperText={errorMsg}
        label={lable}
        value={value}
        // style={{ margin: 8 }}
        name={name}
        placeholder={placeholder}
        fullWidth
        onChange={(ev) => handleChange(ev)}
        margin="normal"
        disabled={isDesable || false}
        inputProps={inputProps}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};

export default InputWithoutIcon;
