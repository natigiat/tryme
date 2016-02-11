var express = require('express');
var router = express.Router();
var sendgrid  = require('sendgrid')('nati','gohartkjh12!@ZX');
var gravatar = require('gravatar');

/* GET home page. */
router.get('/', function(req, res, next) {
  var user =  req.user;
	if(req.isAuthenticated()){
    var url = gravatar.url(user.email, {s: '200', r: 'pg', d: '404'});
		res.render('support', {title: 'Support' , name: req.user.name, image: url });
	}else{
		req.toastr.info('start your first progect', "Welcome to Landing Chat");
    	res.locals.toasts = req.toastr.render()
		res.render('support', {title: 'Support'  });
	}
  	
});



/* post support. */
router.post('/', function(req, res, next) {
  
  var name   = req.body.name;
  var email  = req.body.email;
  var messages  = req.body.messages;

  sendgrid.send({
    to:       'natigiat@gmail.com',
    from:     email,
    subject:  'support request from ' + email,
    html:     '<table> <tr> <td style="background:#000; text-align:center;"> <a href="http://bresponsive.org" style="text-decoration:none; text-align:center;"> <span style="font-family: RobotoThin;font-size: 1.6rem;font-weight: bold;text-align:center;color:white;line-height: 2">B-responsive : support message</span> </a> </td> </tr> <tr> <td> <h2>ask fo support from '+email+'</h2> <p>'+messages+'</p> </td> </tr> <tr> <td style="background:#ccc; padding:20px;">You receiving this email because you are member of B-responsive. </td> </tr> </table> '
  }, function(err, json) {
    if (err) { return console.error(err); }
    res.send("good");
  });
     
});






module.exports = router;
