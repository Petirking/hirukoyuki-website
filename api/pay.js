const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'No items in cart'
      });
    }

    const line_items = items.map(item => ({
      price_data: {
        currency: 'myr',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: 'https://hirukoyuki.my/success',
      cancel_url: 'https://hirukoyuki.my/cancel',
    });

    res.status(200).json({
      url: session.url
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};