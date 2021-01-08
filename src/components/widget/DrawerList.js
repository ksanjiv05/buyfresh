import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InputIcon from "@material-ui/icons/Input";
import HelpIcon from "@material-ui/icons/Help";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Context from "../../Context";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});
const DrawerList = (props) => {
  const classes = useStyles();
  const history = useHistory();
  // const [open, setOpen] = React.useState(false);
  const { auth, isAuthenticate, singOut } = useContext(Context);

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      // setOpen(false);
    }
  }
  return (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={() => props.toggleDrawer("left", false)}
      // onKeyDown={props.toggleDrawer(anchor, true)}
    >
      <div
        className="profile-icon"
        onClick={() =>
          isAuthenticate ? history.push("/profile") : history.push("/login")
        }>
        <img
          src={
            auth.auth0.currentUser != null
              ? auth.auth0.currentUser.photoURL
                ? auth.auth0.currentUser.photoURL
                : ""
              : ""
          }
          alt="logo"
          style={{ width: "100%" }}
        />
      </div>
      <Divider />

      <List onKeyDown={handleListKeyDown}>
        <div onClick={() => history.push("/profile")}>
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
        </div>
        <div onClick={() => history.push("/order")}>
          <ListItem button>
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="My Orders" />
          </ListItem>
        </div>
        <div onClick={() => history.push("/cart")}>
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="My Cart" />
          </ListItem>
        </div>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
        <div
          onClick={() => (isAuthenticate ? singOut() : history.push("/login"))}>
          <ListItem button>
            <ListItemIcon>
              {isAuthenticate ? <ExitToAppIcon /> : <InputIcon />}
            </ListItemIcon>
            <ListItemText primary={isAuthenticate ? "Logout" : "Login"} />
          </ListItem>
        </div>
      </List>
    </div>
  );
};

export default DrawerList;
