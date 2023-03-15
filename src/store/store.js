import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cartReducer';
import { productReducer } from './reducers/productReducer'


const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
    },
});

export default store;