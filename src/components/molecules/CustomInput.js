import React from "react";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import CreateIcon from "@material-ui/icons/Create";
const CustomInput = ({
  lable,
  placeholder,
  value,
  name,
  handleChange,
  nonEditable,
}) => {
  const [isEdit, setIsEdit] = React.useState(true);
  return (
    <div>
      <TextField
        label={lable}
        name={name}
        value={value}
        // style={{ margin: 8 }}
        placeholder={placeholder}
        fullWidth
        disabled={isEdit}
        onChange={(ev) => handleChange(ev)}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: nonEditable ? (
            <></>
          ) : (
            <InputAdornment position="end">
              <IconButton onClick={() => setIsEdit(false)}>
                <CreateIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default CustomInput;
