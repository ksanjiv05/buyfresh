import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from "./pages/common/Header";
import HomePage from "./pages/Home/HomePage";
import Cart from "./pages/cart/Cart";
import CartCheckout from "./pages/cart/CartCheckout";
import AddAddress from "./pages/account/AddAddress";
import Account from "./pages/account/Account";
import AccountProfile from "./pages/account/AccountProfile";
// import Address from "./widget/Address";
import Addresses from "./pages/account/address/Addresses";
import Register from "./pages/authentication/Register";
import MyOrder from "./pages/orders/MyOrder";
import Orders from "./pages/orders/Orders";
import MobileLogin from "./pages/authentication/MobileLogin";

const Index = () => {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    console.log("toggel call");
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  return (
    <BrowserRouter>
      <Header toggleDrawer={toggleDrawer} />
      {state ? <Account toggleDrawer={toggleDrawer} openState={state} /> : ""}
      <div style={{ marginTop: "70px" }}>
        <Switch>
          <Route exact path="/" render={(props) => <HomePage />} />
          <Route exact path="/cart" render={(props) => <Cart />} />
          <Route exact path="/checkout" render={(props) => <CartCheckout />} />
          <Route exact path="/addaddress" render={(props) => <AddAddress />} />
          <Route exact path="/profile" render={(props) => <AccountProfile />} />
          <Route exact path="/address" render={(props) => <Addresses />} />
          <Route exact path="/reg" render={(props) => <Register />} />
          <Route exact path="/order" render={(props) => <Orders />} />
          <Route exact path="/order/descp" render={(props) => <MyOrder />} />
          <Route exact path="/login" render={(props) => <MobileLogin />} />
          {/*

           <Route exact path="/product" render={(props) => <Product />} />
           */}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Index;
