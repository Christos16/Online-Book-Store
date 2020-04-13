import React, { useState } from 'react';
import styles from './Radiobox.module.css';
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;

const RadioBox = props => {
  const [value, setValue] = useState('0');
  const renderRadioBox = () =>
    props.list &&
    props.list.map(value => (
      <Radio key={value._id} value={`${value._id}`}>
        <span className={styles.price}> {value.name}</span>
      </Radio>
    ));

  const handleChange = event => {
    setValue(event.target.value);

    props.handleFilters(event.target.value);
  };

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header='Price Range $' key='1'>
          <Radio.Group onChange={handleChange} value={value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
};

export default RadioBox;
