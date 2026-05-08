import React from 'react';
import Link from 'next/link';

const Canceled = () => {
  return (
    <div className="success-wrapper">
      <div className="success">
        <h2>Checkout canceled</h2>
        <p className="description">
          Your payment was not completed, and your cart is still available.
        </p>
        <Link href="/" passHref>
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Canceled;
