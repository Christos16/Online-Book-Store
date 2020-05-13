import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import styles from './product.module.css';
const ProductImage = props => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];

      props.detail.images &&
        props.detail.images.map(item => {
          images.push({
            original: item,
            thumbnail: item
          });
        });
      setImages(images);
    }
  }, [props.detail]);

  return (
    <div className={styles.image} data-test='ProductImage'>
      <ImageGallery items={images} />
    </div>
  );
};

export default ProductImage;
