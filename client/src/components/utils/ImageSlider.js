import React from 'react';
import { Carousel } from 'antd';

const ImagesSlider = props => {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img src={image} alt='productImage' style={{ width: '100%' }} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImagesSlider;
