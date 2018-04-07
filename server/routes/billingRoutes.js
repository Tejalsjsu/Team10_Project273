const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleware/requireLogin');
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //need movie id and user id

    const charge = await stripe.charges.create({
      amount: 900,
      currency: 'usd',
      description: '$9 for the movie',
      source: req.body.id
    });

    if (charge.status === 'succeeded') {
      console.log('The status here is', charge.status);
      //need to save in the DB
      res.status(200).send({ message: 'Thank you for making the payment' });
    } else {
      res.status(401).send({ error: 'Payment did not go through' });
    }
  });
};
