import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../../Context";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CartItemDetails from "../../widget/CartItemDetails";
import CartPriceDeatils from "../../widget/CartPriceDeatils";
import CustomButton from "../../molecules/CustomButton";
import { isMobile } from "react-device-detect";
import "./cart.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "14px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Cart = () => {
  const { totalCart, totalQuntity, clearCart } = useContext(Context);
  const history = useHistory();
  const classes = useStyles();
  let [subtotal, setSubTotal] = useState(0);
  let [mylist, setMylist] = useState();

  useEffect(() => {
    setMylist(
      totalCart.map((cartItem) => {
        setSubTotal((subtotal += cartItem.price * cartItem.quntity));
        return cartItem.quntity && <CartItemDetails cartItem={cartItem} />;
      })
    );

    console.log("++++++++++++++++++");
  }, [totalCart]);

  useEffect(() => {
    if (totalQuntity === 0) setSubTotal(0);
  }, [totalQuntity]);

  //totalCart.reduce((sum, v) => sum + v.price * v.quntity);
  const desktop = () => (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8} sm={8}>
          <Paper className={classes.paper}>
            {totalQuntity > 0 ? (
              <div>
                <table style={{ width: "100%" }}>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th></th>
                    <th>Quntity</th>
                    <th></th>
                    <th>Total</th>
                  </tr>
                  {mylist}
                </table>
                <div style={{ display: "inline-flex" }}>
                  <CustomButton clearCart={clearCart} value="Clear Cart" />
                  <Button
                    variant="contained"
                    color="default"
                    style={{ marginLeft: "5px" }}
                    onClick={() => history.push("/checkout")}
                    // startIcon={<AddShoppingCartIcon />}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            ) : (
              <h1>You have no cart in the Basket </h1>
            )}
          </Paper>
        </Grid>
        <Grid item xs={4} sm={4}>
          <Paper className={classes.paper}>
            <CartPriceDeatils subtotal={subtotal} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );

  const mobile = () => (
    <div className="cart-root">
      <div className="cart-items">
        {totalQuntity > 0 ? (
          <div>
            <table style={{ width: "100%" }}>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th></th>
                <th>Quntity</th>
                <th></th>
                <th>Total</th>
              </tr>
              {mylist}
            </table>
            <div style={{ display: "inline-flex" }}>
              <CustomButton clearCart={clearCart} value="Clear Cart" />
              {/* <button >
                Checkout
              </button> */}
              <Button
                variant="contained"
                color="default"
                style={{ marginLeft: "5px" }}
                onClick={() => history.push("/checkout")}
                // startIcon={<AddShoppingCartIcon />}
              >
                Checkout
              </Button>
            </div>
          </div>
        ) : (
          <h1>You have no cart in the Basket </h1>
        )}
      </div>
      <div>
        <CartPriceDeatils subtotal={subtotal} />
      </div>
    </div>
  );
  return isMobile ? mobile() : desktop();
};

export default Cart;
