import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// initial state
const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
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
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        removeFromCart: (state, action) => {
            let latestCart = state.cartItems.filter((item) => item.id !== action.payload.id)
            state.cartItems = latestCart;
            toast.warning(`${action.payload.name} removed from cart`, {
                position: 'bottom-right'
            });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
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
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        decreaseQuantity: (state, action) => {
            if (action.payload.cartQuantity !== 1) {
                const itemIndex = state.cartItems.findIndex(
                    (item) => item.id === action.payload.id
                );
                state.cartItems[itemIndex].cartQuantity -= 1;
            } else {
                toast.error(`You can not order less than one item!`, {
                    position: 'bottom-right'
                })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        clearCart: (state, action) => {
            state.cartItems = [];
            toast.error(`Cart cleared successfully`, {
                position: 'bottom-right'
            });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
    }
});


// create actions
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;