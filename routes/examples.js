var express = require('express');
var router = express.Router();
var sendgrid  = require('sendgrid')('nati','gohartkjh12!@ZX');
var gravatar = require('gravatar');

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
  var user =  req.user;
	if(req.isAuthenticated()){
    var url = gravatar.url(user.email, {s: '200', r: 'pg', d: '404'});
		res.render('example', {title: 'Examples' , name: req.user.name,  image: url  });
	}else{
		req.toastr.info('start your first progect', "Welcome to Landing Chat");
    	res.locals.toasts = req.toastr.render()
		res.render('example', {title: 'Examples'  });
	}
  	
});



module.exports = router;
