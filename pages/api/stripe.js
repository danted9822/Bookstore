import Stripe from 'stripe';
import { client } from '../../lib/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const cartItems = Array.isArray(req.body) ? req.body : [];

    if (cartItems.length < 1) {
      res.status(400).json({ message: 'Cart is empty.' });
      return;
    }

    const ids = [...new Set(cartItems.map((item) => item?._id).filter(Boolean))];
    const productsQuery = `*[_type == "product" && _id in $ids]{
      _id,
      name,
      price,
      image
    }`;
    const products = await client.fetch(productsQuery, { ids });
    const productMap = new Map(products.map((product) => [product._id, product]));

    const lineItems = cartItems.map((item) => {
      const product = productMap.get(item._id);
      if (!product) {
        throw new Error(`Product not found for id: ${item._id}`);
      }

      const quantity = Math.max(1, Number(item.quantity) || 1);
      const imgRef = product?.image?.[0]?.asset?._ref || '';
      const newImage = imgRef
        .replace('image-', 'https://cdn.sanity.io/images/jo6uniqn/production/')
        .replace('-webp', '.webp');

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: newImage ? [newImage] : [],
          },
          unit_amount: Math.round(product.price * 100),
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity,
      };
    });

    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1LxoJHArLWrlbcSTE1xVILeQ' },
        { shipping_rate: 'shr_1LxoU6ArLWrlbcSTpakvH7L8' },
      ],
      line_items: lineItems,
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/canceled`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message || 'Checkout failed.' });
  }
}
