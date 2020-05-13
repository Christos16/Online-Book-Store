import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Card } from 'antd';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './product.module.css';

function ProductInfo(props) {
  const [Product, setProduct] = useState({});
  const user = useSelector(state => state.user);
  console.log(Product);

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);

  const addToCarthandler = () => {
    if (user.userData.isAuth) {
      props.addToCart(props.detail._id);
    } else {
      props.history.push('/login');
    }
  };

  return (
    <div data-test='ProductInfo'>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            marginTop: '10px',
            borderRadius: '30px',
            width: '170px',
            height: '150px',
            shadowOpacity: 0.1,
            shadowRadius: 0.2,
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: 'white',
            marginLeft: '150px'
          }}
        >
          <span className={styles.price}>${Product.price}</span>
          <Button shape='round' type='danger' onClick={addToCarthandler} block>
            Add to Cart
          </Button>
        </div>
      </div>
      <Card className={styles.cart}>
        <div style={{ paddingTop: '10px' }}>
          <span className={styles.head}>Author:</span>{' '}
          <span className={styles.subhead}>{Product.author}</span>
        </div>
        <div>
          <span className={styles.head}>Publisher:</span>{' '}
          <span className={styles.subhead}>{Product.publisher}</span>
        </div>
        <div>
          <span className={styles.head}>ISBN:</span>{' '}
          <span className={styles.subhead}>{Product.isbn}</span>
        </div>
        <div>
          <span className={styles.head}>Number of Pages:</span>{' '}
          <span className={styles.subhead}>{Product.pagenumber}</span>
        </div>
        <div>
          <span className={styles.head}>Dimensions:</span>{' '}
          <span className={styles.subhead}>{Product.dimensions}</span>
        </div>
        <div>
          <span className={styles.head}>Date of Publication:</span>{' '}
          <span className={styles.subhead}>{Product.year}</span>
        </div>
      </Card>
      <br />
      <div>
        <Card title='Description' bordered={true} className={styles.cart}>
          <h5 className={styles.description}>{Product.description}</h5>
        </Card>
      </div>
    </div>
  );
}

export default withRouter(ProductInfo);
