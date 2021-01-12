import React from "react";
import IconButton from "@material-ui/core/IconButton";

export default function CustomIconButton({
  component,
  handleClick,
  params,
  color,
  style,
}) {
  return (
    <IconButton
      color={color}
      size="small"
      onClick={() => handleClick(params)}
      style={style}>
      {component}
    </IconButton>
  );
}
