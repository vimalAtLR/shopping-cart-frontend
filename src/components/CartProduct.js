import React from 'react'

function CartProduct(props) {
    const { cartItem, handleIncrease, handleDecrease, handleRemoveItem } = props;

    return (
        <div className="cart-item" key={cartItem.id}>
            <div className="cart-product">
            <img src={cartItem.image} alt={cartItem.name} />
            <div>
                <h3>{cartItem.name}</h3>
                <p>{cartItem.desc}</p>
                <button onClick={() => handleRemoveItem(cartItem)}>Remove Item</button>
            </div>
            </div>
            <div className="cart-product-price">{cartItem.price}</div>
            <div className="cart-product-quantity">
                <button onClick={() => handleDecrease(cartItem)}>-</button>
            <div className="count">{cartItem.cartQuantity}</div>
                <button onClick={() => handleIncrease(cartItem)}>+</button>
            </div>
            <div className="cart-product-total-price">
                {cartItem.price * cartItem.cartQuantity}
            </div>
        </div>
    )
}

export default CartProduct
