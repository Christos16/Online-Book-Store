import React, { useState } from 'react';
import styles from './checkoutitem.module.css';
import { quantityChange } from '../../../../_actions/user_actions';
import { Button } from 'antd';

const UserCard = props => {
  const renderCartImage = images => {
    if (images.length > 0) {
      let image = images[0];
      return image;
    }
  };

  const renderItems = () =>
    props.products &&
    props.products.map(product => (
      <div key={product._id}>
        <div className={styles.checkoutitem}>
          <div className={styles.imagecontainer}>
            <img
              className={styles.image}
              src={renderCartImage(product.images)}
              alt='item'
            />
          </div>
          <span className={styles.name}>{product.title}</span>

          <span className={styles.name} style={{ marginLeft: '20px' }}>
            {' '}
            {product.author}
          </span>

          <span className={styles.price}>$ {product.price}</span>

          <Button
            shape='round'
            type='danger'
            className={styles.removebutton}
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
