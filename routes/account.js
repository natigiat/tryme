var express = require('express');
var router = express.Router();
// var $ = require('jQuery');
var S = require('string');
var moment = require('moment');
var gravatar = require('gravatar');

var User = require('../modules/user.js');
var Site = require('../modules/website.js');

 

router.get('/', ensureAuthenticated ,function(req, res, next) {
  
  var user =  req.user;
  //get avatar
  var url = gravatar.url(user.email, {s: '200', r: 'pg', d: '404'});
  var id =  req.user.id;
  var role =  req.user.role;
  var userName =  req.user.name;
    userName = userName.replace(/\s/g, '');

  User.selectUser(id , function(err , user){
     
    if(role == "0"){
      res.render('account', {  title: 'Account' , name: userName , role: user.role ,image: url});
    }
		res.redirect('/account/progect');

  });

});


router.get('/progect', ensureAuthenticated ,function(req, res, next) {
  var user =  req.user;
  var rolename;

  //get user register date
  var date = new Date(user.time);  // dateStr you get from mongodb
  var d = ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
  var role =  req.user.role;
  if(role == "1"){rolename="Basic - update"}
  else if(role == "2"){rolename="Editor - update"}
  else if(role == "3"){rolename="Full - unlimited pacakge"}


  // get user gravatr
  var url = gravatar.url(user.email, {s: '200', r: 'pg', d: '404'});
  var id =  req.user.id;
  var userName =  req.user.name;
    userName = userName.replace(/\s/g, '');

  Site.getAllSite(id , function(err , sites){    
    if (sites === []){sites = 0}
      console.log(typeof(sites));
    res.render('progect', {title: 'Account Settings' , id:id , name: userName,userInfo:req.user ,image: url, date:d, role:role , rolename:rolename , sites:sites });
  });
    
});


router.post('/progect', function(req, res, next) {
  
  
  var userId = req.user.id;
  var name = req.body.name;
  var url  = "http://exmple.com";
  var active = 0;

  console.log(userId);
  console.log(name);
  console.log(name);
  console.log(active);


  var newSite = new Site ({
      userId: userId,
      name: name,
      url : name,
      active :active ,
  });

    // save the user
    newSite.save(function(err ,newManage) {
        if(err) {
            console.log(err);
        }

    });   

});


//for ajax call all progect
router.get('/progect/all', function(req, res, next) {
  
   var id = req.user.id;
   Site.getAllSite(id , function(err , sites){    
      console.log(sites);
      res.writeHead(200, { 'Content-Type': 'application/json' }); 
      res.end(JSON.stringify(sites));
   });

});



/* GET users listing. */
router.get('/setting', ensureAuthenticated , function(req, res, next) {
   var userName =  req.user.name;
    userName = userName.replace(/\s/g, '');
   var userEmail =  req.user.email;


  res.render('accountSetting', {title: 'Account Settings' , name: userName,email:userEmail ,userInfo:req.user });
});




function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
   	res.redirect('/users/login');
}


module.exports = router;
