import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {
  const [searchTerm, setSearchTerms] = useState('');
  const onChangeSearch = event => {
    setSearchTerms(event.currentTarget.value);
    props.refreshFunction(event.currentTarget.value);
  };
  return (
    <div>
      <Search
        value={searchTerm}
        onChange={onChangeSearch}
        placeholder='Search a Book Title or Author ...'
      />
    </div>
  );
}

export default SearchFeature;
