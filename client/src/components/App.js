import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import UploadProduct from './views/UploadProduct/UploadProduct';
import DetailProduct from './views/DetailProductPage/DetailProduct';
import CartPage from './views/CartPage/CartPage';
import { Spin } from 'antd';
import PrivacyPolicy from './views/NavBar/Sections/PrivacyPolicy';
import Cookies from '../components/utils/Cookies';

function App() {
  return (
    <Suspense
      fallback={
        <div>
          <Spin />
        </div>
      }
    >
      <NavBar />

      <div
        style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}
        data-test='AppComponent'
      >
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route
            exact
            path='/privacy-policy'
            component={Auth(PrivacyPolicy, null)}
          />
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
          <Route
            exact
            path='/product/upload'
            component={Auth(UploadProduct, true)}
          />
          <Route
            exact
            path='/product/:productId'
            component={Auth(DetailProduct, null)}
          />

          <Route exact path='/user/cart' component={Auth(CartPage, true)} />
        </Switch>
      </div>
      <br />
      <Cookies />
      <br />
      <Footer />
    </Suspense>
  );
}

export default App;
