import React, { useState } from "react";
import BottomNavigation from "./Components/BottomNavigation";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Bill from "./Components/Bill";
import { Provider } from "react-redux";
import store from "./Components/Redux/store";
import { Grid } from "@material-ui/core";
import Book from "./Components/Books/Book";
import Class from "./Components/Classes/Class";
import Grade from "./Components/Books/Filters/Grade";
import Publishes from "./Components/Books/Filters/Publishes";
import Major from "./Components/Books/Filters/Major";
import Sort from "./Components/Books/Filters/Sort";
import Product from "./Components/Books/Product/Product";
import CartFinal from "./Components/CardItem/CartFinal";
import Wallet from "./Components/Home/Wallet/Wallet";
import "./App.css";
function App() {
  const [numInCart, setNumInCart] = useState(0);
  const [pos, setPos] = useState(true);
  const numInCartHandler = () => {
    if (pos) setNumInCart(numInCart + 1);
    else setNumInCart(numInCart - 1);
  };
  const posHandler = (val) => {
    setPos(val);
  };
  return (
    <div className="appContainer">
      <Provider store={store}>
        <Grid
          container
          style={{
            background: "#E8E8A6",
          }}
        >
          <Grid item xs={12} style={{ minHeight: "100vh" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bill" element={<Bill />} />
              <Route
                path="/card"
                element={
                  <Cart
                    posHandler={posHandler}
                    numInCartHandler={numInCartHandler}
                  />
                }
              />
              <Route
                path="/books"
                element={
                  <Book
                    posHandler={posHandler}
                    numInCartHandler={numInCartHandler}
                  />
                }
              />
              <Route path="/classes" element={<Class />} />
              <Route path="/books/grade" element={<Grade />} />
              <Route path="/books/major" element={<Major />} />
              <Route path="/books/publishes" element={<Publishes />} />
              <Route path="/books/sort" element={<Sort />} />
              <Route
                path="/books/:id"
                element={
                  <Product
                    posHandler={posHandler}
                    numInCartHandler={numInCartHandler}
                  />
                }
              />
              <Route path="/card/final" element={<CartFinal />} />
              <Route path="/wallet" element={<Wallet />} />
            </Routes>
          </Grid>
          <Grid xs={12} item style={{ bottom: "0", position: "sticky" }}>
            <BottomNavigation numInCart={numInCart} />
          </Grid>
        </Grid>
      </Provider>
    </div>
  );
}

export default App;
