import React from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';

const CookieDisplay = () => {
  return (
    <CookieConsent
      acceptOnScroll={false}
      location='bottom'
      buttonText='I understand'
      cookieName='myAwesomeCookieName2'
      style={{ background: '#2B373B' }}
      buttonStyle={{ color: 'lightblue', fontSize: '15px', fontWeight: 'bold' }}
      expires={150}
    >
      This website uses cookies to enhance the user experience. By continuing to
      browse you are agreeing to our use of cookies described on our{' '}
      <a className='link font-weight-bold' href='/privacy-policy'>
        privacy policy.
      </a>
    </CookieConsent>
  );
};

export default CookieDisplay;
