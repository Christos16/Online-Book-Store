import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy
} from '../../../_actions/user_actions';
import UserCard from './Sections/UserCard';
import { Result, Empty } from 'antd';
import Paypal from '../../utils/Paypal';
import Axios from 'axios';
import styles from './Sections/checkoutitem.module.css';

const CartPage = props => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let cartItems = [];
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.userData.cart));
      }
    }
  }, [props.user.userData]);

  useEffect(() => {
    if (props.user.cartDetail && props.user.cartDetail.length > 0) {
      calculateTotal(props.user.cartDetail);
    }
  }, [props.user.cartDetail]);

  const calculateTotal = cartDetail => {
    let total = 0;

    cartDetail.map(item => {
      total += item.price;
    });

    setTotal(Math.max(Math.round(total * 10) / 10, 2.8).toFixed(1));
    setShowTotal(true);
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  const removeFromCart = productId => {
    dispatch(removeCartItem(productId)).then(refreshPage());
  };

  const transactionSuccess = data => {
    let variables = {
      cartDetail: props.user.cartDetail,
      paymentData: data
    };
    Axios.post('/api/users/successBuy', variables).then(response => {
      if (response.data.success) {
        setShowSuccess(true);
        setShowTotal(false);
        dispatch(
          onSuccessBuy({
            cart: response.data.cart,
            cartDetail: response.data.cartDetail
          })
        );
      } else {
        alert('Failed to buy it');
      }
    });
  };

  const transactionError = () => {
    console.log('Paypal error');
  };

  const transactionCanceled = () => {
    console.log('Transaction canceled');
  };

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>
      <div>
        <UserCard
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />
        {props.user.cartDetail && (
          <h4 style={{ fontWeight: '900', fontSize: '15px' }}>
            + Delivery Cost $ 5,00
          </h4>
        )}
        {showTotal ? (
          <div
            style={{
              marginTop: '3rem',
              justifyContent: 'right',
              position: 'right'
            }}
          >
            <h2>
              Total amount: <span className={styles.total}>${total + 5}</span>
            </h2>
          </div>
        ) : showSuccess ? (
          <Result status='success' title='Succesfully Purchase' />
        ) : (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <br />
            <Empty description={false} />
            <p>No Items In the Cart</p>
          </div>
        )}
      </div>
      {/* Paypal checkout*/}
      <Paypal
        toPay={total}
        onSuccess={transactionSuccess}
        transactionError={transactionError}
        transactionCanceled={transactionCanceled}
      />
    </div>
  );
};

export default CartPage;
