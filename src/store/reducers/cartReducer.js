import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// initial state
const initialState = {
  cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).cartItems : [],
  cartTotalQuantity: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).cartTotalQuantity : 0,
  cartTotalAmount: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).cartTotalAmount : 0,
};

// createSlice for cart
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.success(`${state.cartItems[itemIndex].name} added ${state.cartItems[itemIndex].cartQuantity} times.`, {
                    position: 'bottom-right'
                });
            } else {
                const tempCart = { ...action.payload, cartQuantity : 1 };
                state.cartItems.push(tempCart);
                toast.success(`${tempCart.name} added to cart`, {
                    position: 'bottom-right'
                });
            }
            state.cartTotalQuantity += 1;
            state.cartTotalAmount += action.payload.price;
            localStorage.setItem('cart', JSON.stringify(state));
        },

        removeFromCart: (state, action) => {
            let latestCart = state.cartItems.filter((item) => item.id !== action.payload.id)
            state.cartItems = latestCart;
            toast.warning(`${action.payload.name} removed from cart`, {
                position: 'bottom-right'
            });
            state.cartTotalQuantity -= action.payload.cartQuantity;
            state.cartTotalAmount -= action.payload.cartQuantity * action.payload.price;
            localStorage.setItem('cart', JSON.stringify(state));
        },

        increaseQuantity: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
            } else {
                const tempCart = { ...action.payload, cartQuantity : 1 };
                state.cartItems.push(tempCart);
            }
            state.cartTotalQuantity += 1;
            state.cartTotalAmount += action.payload.price;
            localStorage.setItem('cart', JSON.stringify(state));
        },

        decreaseQuantity: (state, action) => {
            if (action.payload.cartQuantity !== 1) {
                const itemIndex = state.cartItems.findIndex(
                    (item) => item.id === action.payload.id
                );
                state.cartItems[itemIndex].cartQuantity -= 1;
                state.cartTotalQuantity -= 1;
                state.cartTotalAmount -= state.cartItems[itemIndex].price;
                localStorage.setItem('cart', JSON.stringify(state));
            } else {
                toast.error(`You can not order less than one item!`, {
                    position: 'bottom-right'
                })
            }
        },

        clearCart: (state, action) => {
            state.cartItems = [];
            toast.success(`Cart cleared successfully`, {
                position: 'bottom-right'
            });
            state.cartTotalQuantity = 0;
            state.cartTotalAmount = 0;
            localStorage.setItem('cart', JSON.stringify(state));
        },
    }
});


// create actions
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;