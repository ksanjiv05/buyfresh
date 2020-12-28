import React from "react";
import Context from "./Context";

const WithContext = (OrginalComponent) => {
  const WithHOC = (props) => {
    return (
      <Context.Consumer>
        {(contxt) => <OrginalComponent {...props} context={contxt} />}
      </Context.Consumer>
    );
  };
  return WithHOC;
};

export default WithContext;
