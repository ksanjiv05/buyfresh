import React from "react";

import Drawer from "@material-ui/core/Drawer";
import DrawerList from "../../widget/DrawerList";

export default function Account(props) {
  return (
    <div>
      <Drawer
        anchor="left"
        open={props.openState}
        onClose={props.toggleDrawer("left", false)}>
        <DrawerList toggleDrawer={props.toggleDrawer("left", false)} />
      </Drawer>
    </div>
  );
}
