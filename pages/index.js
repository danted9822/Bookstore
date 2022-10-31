import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData,footerBannerData }) => {
  return (
    <>

      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />


      <div className='products-heading'>
        <h2>
          Best Selling Books
        </h2>
        <p> Books of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={footerBannerData && footerBannerData[0]} />

    </>
  )
}

export const getServerSideProps = async () => {

  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const footerBannerQuery = '*[_type == "footerBanner"]';
  const footerBannerData = await client.fetch(footerBannerQuery);

  return {
    props: { products, bannerData,footerBannerData }
  }

}

export default Home