import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import Products from './components/Products/Products';
// import NavBar from './components/NavBar/Navbar';

import { Products, Navbar, Cart } from "./components";
import { commerce } from "./lib/commerce";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const addToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  };

  const updateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const removeFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const emptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();

    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={addToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart 
            cart={cart}
            updateCartQty={updateCartQty}
            removeFromCart={removeFromCart}
            emptyCart={emptyCart}
             />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
