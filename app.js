var express = require('express');
var paypal_api = require('paypal-rest-sdk');
var app = express();

var config_opts = {
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'AZybIxA_bSdwsA-Fy-p8XTnCOkmZ4xVUdnNHGG2HXN_yfeURL15PYBrCeXvY',
    'client_secret': 'EITlAxDNAHIsozeUf5Av5i1C47NEYHhbHESRzGY6vplJ3px0KMFzp55Ge29H'
};


var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http:\/\/localhost\/test\/rest\/rest-api-sdk-php\/sample\/payments\/ExecutePayment.php?success=true",
        "cancel_url": "http:\/\/localhost\/test\/rest\/rest-api-sdk-php\/sample\/payments\/ExecutePayment.php?success=false"
    },
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "1000000.00"
        },
        "description": "Big Payment"
    }]
};

app.post('/pay', function(req, res) {
  paypal_api.payment.create(create_payment_json, config_opts, function (err, res) {
    if (err) {
      throw err;
    }

    if (res) {
    console.log("Create Payment Response");
      console.log(res);
    }
  });
});

var port = process.env.PORT || 8081;
app.listen(port, function() {
  console.log('Listening to port ' + port);
});
