import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';
import { productReducer } from './reducers/productReducer'


const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        auth: authReducer,
    },
});

export default store;