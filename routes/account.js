var express = require('express');
var router = express.Router();
// var $ = require('jQuery');
var S = require('string');
var moment = require('moment');
var gravatar = require('gravatar');
var sendgrid  = require('sendgrid')('nati','gohartkjh12!@ZX');
var User = require('../modules/user.js');
var Site = require('../modules/website.js');
var path = require('path');

 


// payment -  set role after payment
router.get('/progect/role/:role',  ensureAuthenticated , function(req, res) {
    
    var id =  req.user.id;
    var name =  req.user.name;
    var role = req.params.role;
    var email =  req.user.email;


    
      sendgrid.send({
        to:       email,
        from:     'bresponsive@gmail.com',
        subject:  'congratulations you are B-responsive user',
        html:     '<table style="width:600px"> <tr> <td style="background:#000; text-align:center;"> <a href="http://bresponsive.org" style="text-decoration:none; text-align:center;"> <span style="font-family: RobotoThin;font-size: 1.6rem;font-weight: bold;text-align:center;color:white;line-height: 2">B-responsive Accounts</span> </a> </td> </tr> <tr style="height:200px;"> <td> <h2>Congratulations <span style="font-weight:bold;">'+name+'</span> you are B-responsive user</h2> <p>You can start add websites to your dashboard and make them reponsive</p> </td> </tr> <tr> <td style="background:#ccc; padding:20px;">You receiving this email because you are member of <a href="http://brespomsive.org">B-responsive</a>  </tr> </table> '
      }, function(err, json) {
        if (err) { return console.error(err); }
        console.log("messege sent")
      });
    
      User.updateUserRole(id , role , function(err , user){
        res.redirect('/account/');
      });
});



// url page for edit website online
router.get('/progect/site/:sitename',  ensureAuthenticated , function(req, res, next) {
  
  var id =  req.user.id;
  var sitename = req.params.sitename;


  Site.getSiteByUserIdAndSiteName(id , sitename , function(err , sites){    
    console.log(sites);
    res.render('url', {title: 'Edit:' + sites, sites:sites });
  });

});



//get page for paying, if paied user redirect to dashboard
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
    }else{
      res.redirect('/account/progect');
    }

	

  });

});



//return dashboard by role - the changes will be in limited progect user can insert
//and for the update section 
router.get('/progect', ensureAuthenticated ,function(req, res, next) {
  
  var userRole = req.user.role;
  if(userRole == "0"){
      res.redirect('/account');
  }else{


    
  var user =  req.user;
  var rolename;

  //get user register date
  var date = new Date(user.time);  // dateStr you get from mongodb
  var d = ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
  var role =  req.user.role;
  if(role == "1"){rolename="Basic"}
  else if(role == "2"){rolename="Editor"}
  else if(role == "3"){rolename="Full"}


  // get user gravatr
  var url = gravatar.url(user.email, {s: '200', r: 'pg', d: '404'});
  var id =  req.user.id;
  var userName =  req.user.name;
    userName = userName.replace(/\s/g, '');

  Site.getAllSite(id , function(err , sites){    
    if (sites === []){sites = 0}
    res.render('progect', {title: 'Account Settings' , id:id , name: userName,userInfo:req.user ,image: url, date:d, role:role , rolename:rolename , sites:sites });
  });
  }
    
});


// add progect
router.post('/progect', ensureAuthenticated ,function(req, res, next) {
  
  
  var userId = req.user.id;
  var userRole = req.user.role;
  var sitename = req.body.sitename;
  var siteurl  = req.body.siteurl;
  Site.countUserWebsite(userId, function(err, c) {
   
          if (userRole == "1" && c >= 1){
            res.send("Your account is limitted for 1 website you can update ");
          } 
          else if (userRole == "2" && c >= 5){
            res.send("Your account is limitted for 5 website you can update ");
          }
          else{
              
            var newSite = new Site ({
                userId: userId,
                name: sitename,
                url : siteurl,
                active: 0,
            });

            // save the user
            newSite.save(function(err ,newManage) {
                if(err) {
                    console.log(err);
                }
                res.send("good");
                
            });  
          } 
     
        
  });
  

});




//delete progect
router.post('/progect/delete', function(req, res, next) {
  
  var userId = req.user.id;
  var siteName= req.body.siteName;

  
  Site.remove({userId:userId ,name:siteName}, function(err,removed) {
      if (removed) {
           res.send(siteName + " deleted paremnttly");   
      }
      else {   
           res.send(err);   
      }
  });


});



//get all progect -ajax xall
router.get('/progect/all', function(req, res, next) {
  
   var id = req.user.id;
   Site.getAllSite(id , function(err , sites){    
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
