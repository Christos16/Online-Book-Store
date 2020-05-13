import React from 'react';

import { Card, Button } from 'antd';
import styles from './product.module.css';
import { withRouter } from 'react-router-dom';

class TabsCard extends React.Component {
  state = {
    key: 'tab1',
    noTitleKey: 'info',
    user: {},
    product: {}
  };

  componentDidMount() {
    this.setState({ product: this.props.detail });
    this.setState({ user: this.props.user });
    console.log(this.props.detail);
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    const Product = this.props.detail;
    const User = this.props.user;

    console.log(this.props.detail);

    const addToCarthandler = () => {
      if (User.userData.isAuth) {
        this.props.addToCart(Product._id);
      } else {
        this.props.history.push('/login');
      }
    };

    const tabListNoTitle = [
      {
        key: 'info',
        tab: 'info'
      },
      {
        key: 'description',
        tab: 'description'
      }
    ];

    const Info = (
      <>
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
      </>
    );

    const Description = (
      <div>
        <h5 className={styles.description}>{Product.description}</h5>
      </div>
    );

    const contentListNoTitle = {
      info: <p>{Info}</p>,
      description: <p>{Description}</p>
    };

    let renderCart;

    if (this.props.detail) {
      renderCart = (
        <div>
          <Card
            hoverable={true}
            style={{ width: '100%' }}
            defaultActiveTabKey='info'
            tabList={tabListNoTitle}
            activeTabKey={this.state.noTitleKey}
            onTabChange={key => {
              this.onTabChange(key, 'noTitleKey');
            }}
          >
            {contentListNoTitle[this.state.noTitleKey]}
          </Card>
        </div>
      );
    }
    return (
      <div data-test='InfoTab'>
        <div className={styles.button}>
          <span className={styles.price}>${Product.price}</span>
          <Button shape='round' type='danger' onClick={addToCarthandler} block>
            Add to Cart
          </Button>
        </div>

        {renderCart}
      </div>
    );
  }
}

export default withRouter(TabsCard);
