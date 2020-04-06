import React, { useEffect, useState } from 'react';
import { FaCode, FaUikit } from 'react-icons/fa';
import axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImagesSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/Checkbox';
import RadioBox from './Sections/RadioBox';
import { continents, price } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';

const { Meta } = Card;

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(4);
  const [postSize, setPostSize] = useState(0);
  const [searchTerms, setSearchTerms] = useState('');
  const [Filters, setFilters] = useState({
    continents: [],
    price: []
  });

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit
    };
    getProducts(variables);
  }, []);

  const getProducts = variables => {
    axios.post('api/product/getProducts', variables).then(res => {
      if (res.data.success) {
        if (variables.loadMore) {
          setProducts([...products, ...res.data.products]);
        } else {
          setProducts(res.data.products);
        }

        setPostSize(res.data.postSize);
        console.log(res.data.products);
      } else {
        alert('Failed to fetch the product data');
      }
    });
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;
    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true
    };
    getProducts(variables);
    setSkip(skip);
  };

  const renderCards = products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          style={{ width: '200px', marginTop: '20px' }}
          hoverable={true}
          cover={
            <a href={`/product/${product._id}`}>
              {' '}
              <ImagesSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={'$' + product.price} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = filters => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters
    };
    getProducts(variables);
    setSkip(0);
  };

  const handlePrice = value => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    console.log('Array:', array);
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;
    if (category === 'price') {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    console.log(newFilters);
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerms = newSearchTerm => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm
    };

    setSkip(0);
    setSearchTerms(newSearchTerm);

    getProducts(variables);
  };

  return (
    <div
      style={{
        width: '75%',
        margin: '3rem auto'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1>
          Any books delivered in no time. <Icon type='books' />
        </h1>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={continents}
            handleFilters={filters => handleFilters(filters, 'continents')}
          />
        </Col>

        <Col lg={12} xs={24}>
          <RadioBox
            list={price}
            handleFilters={filters => handleFilters(filters, 'price')}
          />
        </Col>
      </Row>

      {/* PART TWO*/}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '1rem auto'
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerms} />
      </div>

      {products.length === 0 ? (
        <div
          style={{
            display: 'flex',
            height: '300px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <h2>No books yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={(16, 24)}>{renderCards}</Row>
        </div>
      )}
      {postSize >= Limit && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px'
          }}
        >
          <button onClick={onLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
