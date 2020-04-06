import React, { useState } from 'react';
import { Upload, Typography, Input, Button, Form, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: 'Science-Fiction' },
  { key: 2, value: 'Self-Development' },
  { key: 3, value: 'Mystery' },
  { key: 4, value: 'Science' },
  { key: 5, value: 'Business' },
  { key: 6, value: 'Philosophy' },
  { key: 7, value: 'Cooking' }
];

function UploadProduct(props) {
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [Price, setPriceValue] = useState(0);
  const [continentValue, setContinentValue] = useState(1);
  console.log(continentValue);
  const [images, setImages] = useState([]);
  const [Author, setAuthor] = useState('');
  const [Publisher, setPublisher] = useState('');
  const [Dimensions, setDimensions] = useState('');
  const [Year, setYear] = useState('');
  const [Pages, setPages] = useState('');
  const [Isbn, setIsbn] = useState('');

  const onIsbnChange = e => {
    setIsbn(e.target.value);
  };
  const onAuthorChange = e => {
    setAuthor(e.target.value);
  };

  const onPublisherChange = e => {
    setPublisher(e.target.value);
  };

  const onDimensionChange = e => {
    setDimensions(e.target.value);
  };

  const onYearPublished = e => {
    setYear(e.target.value);
  };

  const onPageNumber = e => {
    setPages(e.target.value);
  };

  const onTitleChange = e => {
    setTitleValue(e.target.value);
  };

  const onDescriptionChange = e => {
    setDescriptionValue(e.target.value);
  };
  const onPriceChange = e => {
    setPriceValue(e.target.value);
  };

  const onSelectContintent = e => {
    setContinentValue(e.target.value);
  };

  const updateImages = newImages => {
    setImages(newImages);
  };
  const onSubmit = e => {
    e.preventDefault();
    const variables = {
      writer: props.user.userData._id,
      title: titleValue,
      description: descriptionValue,
      author: Author,
      dimensions: Dimensions,
      year: Year,
      pagenumber: Pages,
      isbn: Isbn,
      price: Price,
      publisher: Publisher,
      images: images,
      continents: continentValue
    };
    axios.post('/api/product/uploadProduct', variables).then(response => {
      if (response.data.success) {
        alert('Product Successfully Uploaded');
        props.history.push('/');
      } else {
        alert('Failed to upload Product');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Food Product</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={titleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={descriptionValue} />
        <br />
        <br />
        <label>Price($)</label>
        <Input onChange={onPriceChange} value={Price} type='number' />
        <br />
        <br />
        <label>Author</label>
        <Input onChange={onAuthorChange} value={Author} />
        <br />
        <br />
        <label>Dimensions:</label>
        <Input onChange={onDimensionChange} value={Dimensions} />
        <br />
        <br />
        <label>Publisher:</label>
        <Input onChange={onPublisherChange} value={Publisher} />
        <br />
        <br />
        <label>Year of publication:</label>
        <Input onChange={onYearPublished} value={Year} />
        <label>Page number:</label>
        <Input onChange={onPageNumber} value={Pages} />
        <br />
        <br />
        <label>ISBN</label>
        <Input onChange={onIsbnChange} value={Isbn} />

        <select onChange={onSelectContintent}>
          {Continents.map(item => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}
export default UploadProduct;
