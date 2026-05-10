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

    // Calculate subtotal from items
    const subtotal = items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Calculate fees (in RM)
    const stripeFeeMYR = 1 + (subtotal * 0.03); // RM1 + 3%
    const userChargeMYR = subtotal * 0.06; // 6% charge
    
    // Convert to cents for Stripe
    const stripeFeeAmount = Math.round(stripeFeeMYR * 100);
    const userChargeAmount = Math.round(userChargeMYR * 100);

    let line_items = items.map(item => ({
      price_data: {
        currency: 'myr',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Add Stripe fee line item
    line_items.push({
      price_data: {
        currency: 'myr',
        product_data: {
          name: 'Stripe Processing Fee (RM1 + 3%)',
          description: 'Payment processor fee',
        },
        unit_amount: stripeFeeAmount,
      },
      quantity: 1,
    });

    // Add 6% service charge line item
    line_items.push({
      price_data: {
        currency: 'myr',
        product_data: {
          name: 'Service Charge (6%)',
          description: 'Additional service charge',
        },
        unit_amount: userChargeAmount,
      },
      quantity: 1,
    });

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