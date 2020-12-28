import React, { useState, useEffect, useContext } from "react";
import Rating from "@material-ui/lab/Rating";
import Context from "../../Context";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CartButton from "../molecules/CartButton";
import "./widget.css";

const addQuntity = 1;

const CardM = (props) => {
  const { addToCart, totalCart } = useContext(Context);
  const { shortDesc, price, id, name, stock } = props.value;

  const [cart, setCart] = useState({
    id: "",
    quntity: 0,
    price: 0,
    shortDesc: "",
    img: "",
    name: "",
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
    <div
      onClick={() => handelClick(props.value)}
      key={id}
      className="card-root">
      <div className="card">
        <img
          src="https://www.treehugger.com/thmb/BNr2j0GvF4E385InF3D25DHXlPM=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2017__12__Ripe_tomatoes_on_vine-68ec0261a1394fcc8682f89d308b941a.jpg"
          className="card-img"
          alt="product"
        />
        <p className="item-name">{name}</p>
        <div className="optionGroup">
          <p className="item-name">{1 + " kg"}</p>
          <div>
            <Rating name="read-only" value={3} readOnly />
          </div>
        </div>
        <div className="optionGroup">
          <p style={{ display: "inline" }}>₹ {price}</p>
          {cart.quntity < 1 ? (
            <Button
              variant="contained"
              color="default"
              // className={classes.button}
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
      </div>
    </div>
  );
};

export default CardM;
