import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import jwtDecode from "jwt-decode";
import "./App.css";
import Index from "./components/Index";
import Auth from "./auth/Auth";
import Context from "./Context";

import Spinner from "./components/molecules/Spinner";

import ProductHelper from "./helper/ProductHelper";
import PopUp from "./PopUp";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      totalQuntity: 0,
      totalCart: [],
      products: [],
      searchValue: "",
      cartValue: 0,
      loding: true,
      isAdmin: false,
      isAuthenticate: false,
    };
    this.auth = new Auth(this.props.history);
    this.auth.auth0.onIdTokenChanged(async (user) => {
      if (user) {
        this.setState({ isAuthenticate: true });
        await user.getIdToken().then((token) => {
          const decodedToken = jwtDecode(token);
          //this.state.isAdmin = decodedToken.admin ? true : false;
          this.setState({ isAdmin: decodedToken.admin });
        });
        sessionStorage.setItem("phoneNumber", user.phoneNumber);
        sessionStorage.setItem("uid", user.uid);
      } else {
        this.setState({ isAuthenticate: false });
        this.auth.auth0.signOut();
      }
    });
  }

  async componentDidMount() {
    this.setState({ loding: true });
    if (localStorage.getItem("cartItemxx")) {
      const documentData = JSON.parse(localStorage.getItem("cartItemxx"));
      this.setState({
        totalQuntity: documentData.totalQuntity,
        totalCart: documentData.totalCart,
        products: documentData.products,
      });
      this.setState({ loding: false });
    } else {
      ProductHelper.GetProducts().then((pd) => {
        this.setState({ products: pd });
        this.setState({ loding: false });
        localStorage.setItem("cartItemxx", JSON.stringify(this.state));
      });
    }
    //}
    // this.setState({ loding: false });
  }

  listenProductUpdate = (product) => {
    if (product) {
      this.state.products.map((p) => {
        if (product.ProductId === p.ProductId) {
          p.price = product.price;
        }
      });
    }
    this.state.totalCart.map((v) => {
      if (product.ProductId === v.ProductId) {
        v.price = product.price;
      }
    });

    localStorage.setItem("cartItemxx", JSON.stringify(this.state));
  };

  addToCart = (cart) => {
    let totalCart = this.state.totalCart;
    if (cart.ProductId === "") return;
    if (totalCart.length === 0 && cart.ProductId !== "") totalCart.push(cart);
    else {
      let cartAvailable = true;
      for (let index = 0; index < totalCart.length; index++) {
        if (totalCart[index].ProductId === cart.ProductId) {
          if (cart.quntity === 0) {
            // this.state.totalCart = [];
          }
          totalCart[index].quntity = cart.quntity;
          cartAvailable = true;
          break;
        } else {
          cartAvailable = false;
        }
      }
      if (!cartAvailable) this.state.totalCart.push(cart);
      //this.setState((prevData) => ({ ...prevData, totalCart: cart })); //totalCart.push(cart);
    }

    localStorage.setItem("cartItemxx", JSON.stringify(this.state));
    this.totalQuntityCalc();
  };

  totalQuntityCalc = () => {
    let total = 0;
    this.state.totalCart.map((v) => (total = total + v.quntity));
    this.setState({ totalQuntity: total });
  };
  addCartValue = (subtotal) => {
    this.setState({ cartValue: subtotal });
  };
  handleSearch = (value) => {
    this.setState({ searchValue: value });
  };

  clearCart = () => {
    localStorage.setItem("cartItemxx", "");
    this.setState({ totalQuntity: 0, totalCart: [] });
  };

  singOut = () => {
    try {
      this.auth.singOut();
      sessionStorage.removeItem("phoneNumber");
      sessionStorage.removeItem("uid");
      // sessionStorage.removeItem("accessToken");
      this.setState({ isAuthenticate: false });
      console.log("User singout successfully");
    } catch (err) {
      console.log("user singout  error");
    }
  };
  removeFromCart = (cartItemId) => {};

  checkout = () => {};
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,

          addToCart: this.addToCart,
          handleSearch: this.handleSearch,
          singOut: this.singOut,
          addCartValue: this.addCartValue,
          listenProductUpdate: this.listenProductUpdate,
          auth: this.auth,
          clearCart: this.clearCart,
        }}>
        <SnackbarProvider maxSnack={3}>
          {/* {this.state.loding ? (
            <Spinner />
          ) : this.state.isAdmin ? (
            <AddProduct />
          ) : (
            <Index />
          )} */}
          {/* {this.state.loding ? (
            <Spinner />
          ) : ( */}

          <PopUp />
          <Index isAuthenticate={this.state.isAuthenticate} />
          {/* )} */}
        </SnackbarProvider>
      </Context.Provider>
    );
  }
}

export default App;
