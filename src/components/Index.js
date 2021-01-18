import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from "./pages/common/Header";
import HomePage from "./pages/Home/HomePage";
import Cart from "./pages/cart/Cart";
import CartCheckout from "./pages/cart/CartCheckout";
import AddAddress from "./pages/account/address/AddAddress";
import Account from "./pages/account/Account";
import AccountProfile from "./pages/account/AccountProfile";
// import Address from "./widget/Address";
import Addresses from "./pages/account/address/Address";
// import Register from "./pages/authentication/Register";
import NewRegister from "./pages/authentication/NewRegister";
// import MyOrder from "./pages/orders/MyOrder";
import Orders from "./pages/orders/Orders";
import MobileLogin from "./pages/authentication/MobileLogin";
import AdminIndex from "./admin/AdminIndex";
import AuthRoute from "./AuthRoute";
import AdminDashboard from "./admin/AdminDashboard";

const Index = ({ isAuthenticate }) => {
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
          <Route exact path="/reg" render={(props) => <NewRegister />} />
          <Route exact path="/login" render={(props) => <MobileLogin />} />
          <Route exact path="/admin/index" render={(props) => <AdminIndex />} />
          <Route
            exect
            path="/admin/dashboard"
            render={(props) => <AdminDashboard />}
          />

          {/* <AuthRoute
            exact
            path="/admin/dashboard"
            authenticated={isAuthenticate}
            component={<AdminIndex />}
          /> */}
          <AuthRoute
            exact
            path="/checkout"
            authenticated={isAuthenticate}
            component={CartCheckout}
          />
          <AuthRoute
            exact
            path="/addaddress"
            authenticated={isAuthenticate}
            component={AddAddress}
          />
          <AuthRoute
            exact
            path="/profile"
            authenticated={isAuthenticate}
            component={AccountProfile}
          />
          <AuthRoute
            exact
            path="/address"
            authenticated={isAuthenticate}
            component={Addresses}
          />
          <AuthRoute
            exact
            path="/order"
            authenticated={isAuthenticate}
            component={Orders}
          />

          {/* <Route exact path="/checkout" render={(props) => <CartCheckout />} />
          <Route exact path="/addaddress" render={(props) => <AddAddress />} />
          <Route exact path="/profile" render={(props) => <AccountProfile />} />
          <Route exact path="/address" render={(props) => <Addresses />} />
          <Route exact path="/order" render={(props) => <Orders />} /> */}
          {/* <Route exact path="/order/descp" render={(props) => <MyOrder />} /> */}

          {/*

           <Route exact path="/product" render={(props) => <Product />} />
           */}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Index;
