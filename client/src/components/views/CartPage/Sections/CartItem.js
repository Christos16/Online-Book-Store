import React from 'react';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <div className='cart-item' data-test='CartItem'>
    <img src={imageUrl} alt='item' />
    <div className='item-details'>
      <span className='name'>{name}</span>
      <span className='price'>
        {' '}
        {quantity} x ${price}
      </span>
    </div>
  </div>
);

export default CartItem;
