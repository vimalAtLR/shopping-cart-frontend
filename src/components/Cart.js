import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartProduct from "./CartProduct";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../store/reducers/cartReducer';

function Cart(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncrease = (product) => {
      dispatch(increaseQuantity(product));
  }
  const handleDecrease = (product) => {
      dispatch(decreaseQuantity(product));
  }
  const handleRemoveItem = (product) => {
      dispatch(removeFromCart(product));
  }
  const handleClearCart = () => {
    dispatch(clearCart());
}

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty !!!</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                // fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((cartItem) => {
              return (
                <CartProduct key={cartItem.id} cartItem={cartItem} handleIncrease={handleIncrease} handleDecrease={handleDecrease} handleRemoveItem={handleRemoveItem} />
              );
            })}
          </div>
          <div className="cart-summary">
            <button className="btn btn-primary" onClick={() => handleClearCart()}>Clear Cart</button>
            <div className="cart-checkout">
              <div className="sub-total">
                <span>Subtotal : </span>
                <span className="amount">{cart.cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping will calculate at checkout</p>
              <button>Check out</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    // fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
