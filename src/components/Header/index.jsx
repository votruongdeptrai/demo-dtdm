import React, { useEffect, useState } from "react";
import "./style.css";
import Login from "../../containers/Login";
import Signup from "../../containers/Signup";
import { useDispatch, useSelector } from "react-redux";
import { getProductSearched, logout } from "../../actions";
import Loading from "../Loading";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupnModal, setShowSignupModal] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { authenticate, authenticating, user, loading } = auth;

  const cart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(
    Object.keys(cart.cartItems).length > 0
      ? Object.keys(cart.cartItems).length
      : ""
  );

  if (authenticating || loading) {
    return <Loading />;
  }

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };
  const nonLoggedMenu = () => (
    <ul className="login_btn_option">
      <li className="login_btn_item">
        <span>New Customer?</span>
        <span
          onClick={() => setShowSignupModal(true)}
          style={{ color: "#2874f0", marginLeft: 40, cursor: "pointer" }}
        >
          Sign Up
        </span>
      </li>
      <li className="login_btn_item">
        <i class="fa-solid fa-circle-user"></i>
        <span>My Profileeeeeeeeeee</span>
      </li>
      <li className="login_btn_item">
        <i class="fa-solid fa-money-check-dollar"></i>
        <span>Orders</span>
      </li>
      <li className="login_btn_item">
        <i class="fa-solid fa-heart"></i>
        <span>Wishlist</span>
      </li>
      <li className="login_btn_item">
        <i class="fa-solid fa-gift"></i>
        <span>Gift Card</span>
      </li>
    </ul>
  );
  const loggedMenu = () => (
    <ul className="login_btn_option">
      <li className="login_btn_item my_profile">
        <i class="fa-solid fa-circle-user"></i>
        <span>My Profile</span>
      </li>
      <li
        onClick={() => history.push("/account/orders")}
        className="login_btn_item"
      >
        <i class="fa-solid fa-money-check-dollar"></i>
        <span>Orders</span>
      </li>
      <li className="login_btn_item">
        <i class="fa-solid fa-heart"></i>
        <span>Wishlist</span>
      </li>
      <li className="login_btn_item">
        <i class="fa-solid fa-gift"></i>
        <span>Gift Card</span>
      </li>
      <li onClick={handleLogout} className="login_btn_item">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Loggout</span>
      </li>
    </ul>
  );

  const handleSubmit = () => {
    const payload = {
      data: search,
      type,
    };

    dispatch(getProductSearched(payload));
    history.push("/search");
  };

  return (
    <div style={{ position: "relative", paddingBottom: 56, minWidth: 987 }}>
      <div className="header_search">
        <div onClick={() => history.push("/")} className="logo">
          <img
            src="https://res.cloudinary.com/de4aiajqg/image/upload/v1648442669/Img/PV-removebg-preview_fo9dmi.png"
            alt=""
          />
        </div>
        <div className="header_input_search">
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products, brands and more"
            type="text"
            name=""
            id=""
          />
          <button onClick={handleSubmit}>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="login_btn_search">
          {authenticate ? (
            <span
              style={{
                textAlign: "center",
                display: "inline-block",
                cursor: "pointer",
                minWidth: 200,
                paddingLeft: 20,
              }}
            >
              Hi, {user.fullName}
            </span>
          ) : (
            <span
              onClick={() => setShowLoginModal(true)}
              className="login_btn_search_submit"
            >
              Login
            </span>
          )}
          {authenticate ? loggedMenu() : nonLoggedMenu()}
        </div>
        <div className="become_seller">
          <span>Become a Seller</span>
        </div>
        <div className="seach_header_more">
          <span style={{ marginRight: 4 }}>More</span>
          <ul className="more_btn_option">
            <li className="more_btn_item">
              <i class="fa-solid fa-bell"></i>
              <span>Notification</span>
            </li>
            <li className="more_btn_item">
              <i class="fa-solid fa-comment-medical"></i>
              <span>24x7 Customer Care</span>
            </li>
            <li className="more_btn_item">
              <i class="fa-solid fa-chart-line"></i>
              <span>Advertise</span>
            </li>
            <li className="more_btn_item">
              <i class="fa-solid fa-download"></i>
              <span>Download App</span>
            </li>
          </ul>
          <i style={{ fontSize: 13 }} class="fa-solid fa-angle-down"></i>
        </div>
        <div
          onClick={() => history.push("/cart")}
          className="search_header_cart"
        >
          <i class="fa-solid fa-cart-shopping"></i>
          <span style={{ marginLeft: 4 }}>
            Cart
            {quantity > 0 ? (
              <span className="cart_quantity">{quantity}</span>
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
      <Login
        open={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
      />
      <Signup
        open={showSignupnModal}
        handleClose={() => setShowSignupModal(false)}
      />
    </div>
  );
};

export default Header;
