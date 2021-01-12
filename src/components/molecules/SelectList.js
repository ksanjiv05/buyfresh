import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function SelectList(props) {
  const classes = useStyles();
  return (
    <div>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        {props.label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
        name={props.name}
        onChange={props.handleChange}
        displayEmpty
        className={classes.selectEmpty}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {props.list.map((v, i) => (
          <MenuItem value={v}>{v}</MenuItem>
        ))}
      </Select>
      {/* <FormHelperText>Label + placeholder</FormHelperText> */}
    </div>
  );
}
