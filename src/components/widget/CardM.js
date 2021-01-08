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
  const { shortDesc, price, ProductId, pname, productImg, stock } = props.value;

  const [cart, setCart] = useState({
    ProductId: "",
    quntity: 0,
    price: 0,
    pname: "",
    productImg: "",
  });

  const handelClick = (value) => {
    // history.push({
    //   pathname: "/product",
    //   search: "?id=" + value.id,
    //   state: { data: value },
    // });
  };

  const handelCart = async (
    ProductId,
    price,
    pname,

    quntity,
    productImg
  ) => {
    let Finalquntity = cart.quntity + quntity;

    setCart((prevData) => ({
      ...prevData,
      ProductId: ProductId,
      quntity: Finalquntity,
      price: price,
      pname: pname,
      productImg: productImg,
    }));
  };

  useEffect(() => {
    addToCart(cart);
    // props.handelCart(cart);
  }, [cart, addToCart]);
  useEffect(() => {
    for (let i = 0; i < totalCart.length; i++) {
      if (totalCart[i].ProductId === ProductId) {
        setCart({
          ProductId: ProductId,
          quntity: totalCart[i].quntity,
          price: totalCart[i].price,
          pname: totalCart[i].pname,
          productImg: productImg,
        });
      }
    }
  }, [totalCart, ProductId, productImg]);

  return (
    <div
      onClick={() => handelClick(props.value)}
      key={ProductId}
      className="card-root">
      <div className="card">
        <img src={productImg} className="card-img" alt="product" />
        <p className="item-name">{pname}</p>
        <div className="optionGroup">
          <p className="item-name">{1 + " kg"}</p>
          <div>
            <Rating name="read-only" value={4} readOnly />
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
              onClick={() =>
                handelCart(ProductId, price, pname, addQuntity, productImg)
              }
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
