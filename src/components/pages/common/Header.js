import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../../Context";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";

import Search from "./Search";
import Login from "../authentication/Login";
import "./Header.css";
import logo from "./buyfresh_logo_2_-removebg-preview.png";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Header(props) {
  const { totalQuntity, isAuthenticate, singOut } = useContext(Context);
  let history = useHistory();
  const classes = useStyles();

  const handelCart = () => {
    history.push("/cart");
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" style={{ backgroundColor: "rgb(89, 6, 95)" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={props.toggleDrawer("left", true)}
            aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <div className={classes.sectionDesktop}>
            <Typography className={classes.title} variant="h6" noWrap>
              <div
                style={{ display: "flex", cursor: "pointer" }}
                onClick={() => history.push("/")}>
                <img src={logo} alt="logo" width="62" />
                <h1 style={{ fontSize: "20px", fontFamily: "cursive" }}>
                  Buy Fresh
                </h1>
              </div>
            </Typography>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={() => history.push("/")}>
              <HomeIcon />
            </IconButton>
          </div>
          <Search />

          <div className={classes.grow} />
          <IconButton
            aria-label="show 4 new mails"
            color="inherit"
            onClick={() => handelCart()}>
            <Badge badgeContent={totalQuntity} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}

            <div
              style={{ cursor: "pointer" }}
              onClick={() => (isAuthenticate ? singOut() : handleClickOpen)}>
              {isAuthenticate ? "LOGOUT" : "LOGIN"}
            </div>
            <Login
              handleClickOpen={handleClickOpen}
              open={open}
              handleClose={handleClose}
            />
          </div>
          <div className={classes.sectionMobile}>
            {/* <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
