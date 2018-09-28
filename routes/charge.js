var express = require('express');
var router = express.Router();
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_live_DE5cKnWtvCbUeE2sm7hc7PKU");

router.post('/', function(req, res, next) {
  const token = req.body.stripeToken; // Using Express
  console.log(token);
  const charge = stripe.charges.create({
    amount: 99,
    currency: 'usd',
    description: 'Example charge',
    source: token,
    statement_descriptor: 'MYFUNCOO',
  }, function( err, token ) {
    if(err){
      res.render( 'error', { message: '결제 실패' })
    }
    else {
      res.render('index', { title: 'Stripe Sample', message: '결제되었습니다!' } );
    }
  });
  // res.send( charge );
});

module.exports = router;
