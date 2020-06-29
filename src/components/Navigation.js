import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navigation = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  return (
    <header className="header">
      <div className="brand">
        <button onClick={openMenu}>&#9776;</button>
        <Link to="/">Campusian</Link>
      </div>
      <div className="header-links">
        <a href="cart.html">Cart</a>
        {userInfo ? (
          <Link to="/profile">{userInfo.name}</Link>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
        {userInfo && userInfo.isAdmin && (
          <div className="dropdown">
            <Link to="">Admin</Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/orders">Orders</Link>
                <Link to="/products">Products</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
