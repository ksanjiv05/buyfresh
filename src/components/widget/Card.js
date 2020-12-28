import React, { useState, useEffect, useContext } from "react";
import Context from "../../Context";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import CartButton from "../molecules/CartButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const addQuntity = 1;

const Card = (props) => {
  const { addToCart, totalCart } = useContext(Context);
  const classes = useStyles();
  const { shortDesc, price, id } = props.value;

  const [cart, setCart] = useState({
    id: "",
    quntity: 0,
    price: 0,
    shortDesc: "",
    img: "",
  });

  const handelClick = (value) => {
    // history.push({
    //   pathname: "/product",
    //   search: "?id=" + value.id,
    //   state: { data: value },
    // });
  };

  const handelCart = async (id, price, shortDesc, quntity, imgUrl) => {
    let Finalquntity = cart.quntity + quntity;

    setCart((prevData) => ({
      ...prevData,
      id: id,
      quntity: Finalquntity,
      price: price,
      shortDesc: shortDesc,
      img: imgUrl,
    }));
  };

  useEffect(() => {
    addToCart(cart);
    // props.handelCart(cart);
  }, [cart]);
  useEffect(() => {
    for (let i = 0; i < totalCart.length; i++) {
      if (totalCart[i].id === id) {
        setCart({
          id: id,
          quntity: totalCart[i].quntity,
          price: totalCart[i].price,
          shortDesc: totalCart[i].shortDesc,
          img: "",
        });
      }
    }
  }, [totalCart, id]);

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      lg={3}
      onClick={() => handelClick(props.value)}
      key={id}>
      <Paper className={classes.paper}>
        <img
          src="https://www.treehugger.com/thmb/BNr2j0GvF4E385InF3D25DHXlPM=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2017__12__Ripe_tomatoes_on_vine-68ec0261a1394fcc8682f89d308b941a.jpg"
          style={{ width: "100%", height: 150 }}
          alt="product"
        />
        <p>{shortDesc}</p>
        <h2 style={{ display: "inline" }}>₹ {price}</h2>
        <span>({price}/KG)</span>
        <div className="optionGroup">
          <select
            className="select"
            //onChange={(ev) => handelPrice(ev)}
            disabled>
            <option value={1}>1 KG</option>
          </select>
          {cart.quntity < 1 ? (
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              style={{ marginLeft: "5px" }}
              onClick={() => handelCart(id, price, shortDesc, addQuntity, "")}
              startIcon={<AddShoppingCartIcon />}>
              Add Cart
            </Button>
          ) : (
            <CartButton
              value={props.value}
              handelCart={handelCart}
              quntity={cart.quntity}
            />
          )}
        </div>
      </Paper>
    </Grid>
  );
};

export default Card;
