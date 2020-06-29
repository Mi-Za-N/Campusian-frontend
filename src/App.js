import React, { useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomeScreen from "./screen/HomeScreen";
import DetailsScreen from "./screen/ProductScreen";
import OrderDetailsScreen from "./screen/OrderScreen";
import CartScreen from "./screen/CartScreen";
import ProfileScreen from "./screen/ProfileScreen";
import SigninScreen from "./screen/SigninScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ShippingScreen from "./screen/ShipppingScreen";
import PaymentScreen from "./screen/PaymentScreen";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";
import { listProductCategories } from "./actions/productActions";
import LoadingBox from "./components/LoadingBox";
import ErrorBox from "./components/ErrorBox";
import AdminProductsScreen from "./screen/ProductsScreen";
import AdminOrdersScreen from "./screen/OrdersScreen";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  window.isAuth = !!userInfo;
  const { categories, loading, error } = productCategoryList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductCategories());
    return () => {
      //
    };
  }, []);
  const openSidebar = () =>
    document.querySelector(".sidebar").classList.add("open");
  const closeSidebar = () =>
    document.querySelector(".sidebar").classList.remove("open");

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button type="button" onClick={openSidebar}>
              &#9776;
            </button>
            <Link to="/">amazona</Link>
          </div>
          <div>
            {cartItems.length !== 0 && (
              <div className="badge">{cartItems.length}</div>
            )}
            <Link className="header-link" to="/cart">
              Cart
            </Link>

            {userInfo ? (
              <>
                <Link className="header-link" to="/profile">
                  {userInfo.name}
                </Link>
                {userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link className="header-link" to="#admin">
                      Admin
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link className="header-link" to="/products">
                          Products
                        </Link>
                      </li>
                      <li>
                        <Link className="header-link" to="/orders">
                          Orders
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link className="header-link" to="/signin">
                {" "}
                Sign in{" "}
              </Link>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <ul className="categories">
            <li>
              <h3>Shopping Categories</h3>
              <button
                type="button"
                className="sidebar-menu-close"
                onClick={closeSidebar}
              >
                x
              </button>
            </li>
            {loading ? (
              <li>
                <LoadingBox />
              </li>
            ) : error ? (
              <li>
                <ErrorBox message={error} />
              </li>
            ) : categories.length === 0 ? (
              <li className="empty-list">There is no categories.</li>
            ) : (
              categories.map((x) => (
                <li key={x}>
                  <Link onClick={closeSidebar} to={`/category/${x}`}>
                    {x}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main onClick={closeSidebar} className="main">
          <PrivateRoute path="/shipping" component={ShippingScreen} />
          <PrivateRoute path="/payment" component={PaymentScreen} />
          <PrivateRoute path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <PrivateRoute path="/profile" component={ProfileScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={DetailsScreen} />
          <PrivateRoute path="/order/:id" component={OrderDetailsScreen} />
          <PrivateRoute path="/products" component={AdminProductsScreen} />
          <PrivateRoute path="/orders" component={AdminOrdersScreen} />
          <Route path="/category/:id" component={HomeScreen} />
          <Route path="/" exact component={HomeScreen} />
        </main>
        <footer className="footer">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
