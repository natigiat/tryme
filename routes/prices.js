var express = require('express');
var router = express.Router();
var sendgrid  = require('sendgrid')('nati','gohartkjh12!@ZX');

/* GET home page. */
router.get('/', function(req, res, next) {
  // sendgrid.send({
  //   to:       'natigiat@gmail.com',
  //   from:     'drawrow.com',
  //   subject:  'welcom to drawrow',
  //   html:     'My sec email through SendGrid.'
  // }, function(err, json) {
  //   if (err) { return console.error(err); }
  //   console.log(json);
  // });

	if(req.isAuthenticated()){
		res.render('prices', {title: 'Prices' , name: req.user.name });
	}else{
		req.toastr.info('start your first progect', "Welcome to Landing Chat");
    	res.locals.toasts = req.toastr.render()
		res.render('prices', {title: 'Prices'  });
	}
  	
});



module.exports = router;
