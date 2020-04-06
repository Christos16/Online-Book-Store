import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { addToCart } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Col, Row } from 'antd';
const DetailProduct = props => {
  const productId = props.match.params.productId;
  const dispatch = useDispatch();
  console.log(productId);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then(res => {
        console.log(res.data[0]);
        setProduct(res.data[0]);
      });
  }, []);

  const addToCartHandler = productId => {
    dispatch(addToCart(productId));
  };

  return (
    <div className='postPage' style={{ width: '100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{product.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <ProductImage detail={product} />
        </Col>
        <Col lg={12} xs={24}>
          <ProductInfo addToCart={addToCartHandler} detail={product} />
        </Col>
      </Row>
    </div>
  );
};

export default DetailProduct;
