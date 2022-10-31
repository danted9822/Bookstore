import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import '../styles/tabletView.css'
import '../styles/mobileView.css'
import '../styles/laptopView.css'


import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp