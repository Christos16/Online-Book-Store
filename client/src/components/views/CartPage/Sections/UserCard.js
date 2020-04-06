import React, { useState } from 'react';
import './checkoutitem.css';
import { quantityChange } from '../../../../_actions/user_actions';
import { Button } from 'antd';

const UserCard = props => {
  const renderCartImage = images => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };

  const renderItems = () =>
    props.products &&
    props.products.map(product => (
      <div key={product._id}>
        <div className='checkout-item'>
          <div className='image-container'>
            <img
              style={{ width: '120px' }}
              src={renderCartImage(product.images)}
              alt='item'
            />
          </div>
          <span className='name'>{product.title}</span>

          <span className='name' style={{ marginLeft: '20px' }}>
            {' '}
            {product.author}
          </span>

          <span className='price'>$ {product.price}</span>

          <Button
            shape='round'
            type='danger'
            onClick={() => props.removeItem(product._id)}
          >
            <span style={{ fontWeight: '900' }}>X</span>
          </Button>
        </div>
      </div>
    ));

  return <div>{renderItems()}</div>;
};

export default UserCard;
