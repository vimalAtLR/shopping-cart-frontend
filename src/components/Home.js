import '.././App.css';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../store/reducers/cartReducer';
import { fetchProduct } from '../store/reducers/productReducer';
import Product from './Product'

function Home(props) {
  const { items } = useSelector(state => state.products);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProduct());
    // eslint-disable-next-line
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  return (
    <div className='home-container'>
      <h2>New Arrivals</h2>
      <div className='products'>
        {items.map(product => {
          return (
            <Product key={product.id} product={product} handleAddToCart={handleAddToCart} />
          )
        })}
      </div>
    </div>
  )
}

export default Home
