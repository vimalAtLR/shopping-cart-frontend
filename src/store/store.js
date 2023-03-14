import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cartReducer';
import { productReducer, fetchProduct } from './reducers/productReducer'


const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
    },
});

store.dispatch(fetchProduct());

export default store;