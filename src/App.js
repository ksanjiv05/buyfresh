import React, { Component } from "react";
import { SnackbarProvider } from "notistack";
import "./App.css";
import Index from "./components/Index";
import axios from "axios";
import Auth from "./auth/Auth";
import Context from "./Context";
import Spinner from "./components/molecules/Spinner";
import AddProduct from "./components/admin/saller/AddProduct";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalQuntity: 0,
      totalCart: [],
      products: [],
      searchValue: "",
      loding: true,
      isAdmin: false,
      isAuthenticate: false,
    };
    this.auth = new Auth(this.props.history);
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
    } else {
      const products = await axios.get(
        "https://buyfreshapi.herokuapp.com/api/products"
      );
      this.setState({ products: products.data.products });
    }
    console.log("access token", sessionStorage.getItem("accessToken"));
    let token = sessionStorage.getItem("accessToken");
    if (!token) {
      this.auth.refreshToken();
    }
    token = sessionStorage.getItem("accessToken");
    let isValidToken = this.auth.decodeToken(token);
    if (isValidToken) {
      console.log("token is valid");
      this.setState({ isAuthenticate: true });
    } else {
      console.log("token is not valid");
      this.setState({ isAuthenticate: false });
      this.auth.refreshToken();
      token = sessionStorage.getItem("accessToken");
      if (await this.auth.decodeToken(token))
        this.setState({ isAuthenticate: true });

      // (window.location.href = "/login")
    }

    this.setState({ loding: false });
  }

  addToCart = (cart) => {
    console.log(this.state.cart, "is cart come ", cart);
    let totalCart = this.state.totalCart;
    if (cart.id === "") return;
    if (totalCart.length === 0 && cart.id !== "") totalCart.push(cart);
    else {
      let cartAvailable = true;
      for (let index = 0; index < totalCart.length; index++) {
        if (totalCart[index].id === cart.id) {
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

    console.log("total cart ", totalCart);
    localStorage.setItem("cartItemxx", JSON.stringify(this.state));
    this.totalQuntityCalc();
  };

  totalQuntityCalc = () => {
    let total = 0;
    this.state.totalCart.map((v) => (total = total + v.quntity));
    this.setState({ totalQuntity: total });
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
      sessionStorage.removeItem("accessToken");
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
          auth: this.auth,
          clearCart: this.clearCart,
          //isSingIn: this.auth.isSinghedIn,
        }}>
        <SnackbarProvider maxSnack={3}>
          {/* {this.state.loding ? (
            <Spinner />
          ) : this.state.isAdmin ? (
            <AddProduct />
          ) : (
            <Index />
          )} */}
          {this.state.loding ? <Spinner /> : <Index />}
        </SnackbarProvider>
      </Context.Provider>
    );
  }
}

export default App;
