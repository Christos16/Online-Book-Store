import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Card } from 'antd';
import './product.css';

function ProductInfo(props) {
  const [Product, setProduct] = useState({});
  console.log(Product);

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail])

  const addToCarthandler = () => {
    props.addToCart(props.detail._id);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            marginTop: '10px',
            borderRadius: '30px',
            width: '150px',
            height: '150px',
            shadowOpacity: 0.1,
            shadowRadius: 0.2,
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: 'white',
            marginLeft: '180px'
          }}
        >
          <span
            style={{ fontWeight: '900', fontSize: '50px', color: 'orange' }}
          >
            ${Product.price}
          </span>
          <Button shape='round' type='danger' onClick={addToCarthandler} block>
            Add to Cart
          </Button>
        </div>
      </div>
      <Card
        style={{
          width: 310,
          borderRadius: '40px',
          boxShadow: '5px 5px 5px 5px'
        }}
      >
        <div style={{ paddingTop: '10px' }}>
          <span className='head'>Author:</span> <span>{Product.author}</span>
        </div>
        <div>
          <span className='head'>Publisher:</span>{' '}
          <span>{Product.publisher}</span>
        </div>
        <div>
          <span className='head'>ISBN:</span> <span>{Product.isbn}</span>
        </div>
        <div>
          <span className='head'>Number of Pages:</span>{' '}
          <span>{Product.pagenumber}</span>
        </div>
        <div>
          <span className='head'>Dimensions:</span>{' '}
          <span>{Product.dimensions}</span>
        </div>
        <div>
          <span className='head'>Date of Publication:</span>{' '}
          <span>{Product.year}</span>
        </div>
      </Card>
      <br />
      <div>
        <Card
          title='Description'
          bordered={true}
          style={{
            width: 300,
            borderRadius: '15px',
            borderRadius: '40px',
            boxShadow: '5px 5px 5px 5px',
            borderBlockColor: 'blue'
          }}
        >
          <h5>{Product.description}</h5>
        </Card>
      </div>
    </div>
  );
}

export default ProductInfo;
