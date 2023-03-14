import '.././App.css';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../store/reducers/cartReducer';

function Home() {
  const { items } = useSelector(state => state.products);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  return (
    <div className='home-container'>
      <h2>New Arrivals</h2>
      <div className='products'>
        {items.map(product => {
          return (
            <div key={product.id} className='product'>
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name} />
              <div className="details">
                <span>{product.desc}</span>
                <span className="price">{product.price}</span>
              </div>
              <button type="button" className="btn btn-primary" onClick={() => handleAddToCart(product)}>Add to cart</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
