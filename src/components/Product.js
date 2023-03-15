import React from 'react'

function Product(props) {
    const { product, handleAddToCart } = props;
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
}

export default Product
