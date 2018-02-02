var connection = require('./../config');
var nodemailer=require('nodemailer');
const https = require('https');
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('195//////////////XJnCVb5a69a673');

module.exports.register=function(req,res){
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var token = '';
  for (var i = 16; i > 0; --i) {
      token += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  var urls = "http://localhost:8000/confirmEmail/" + req.body.EMAIL_ID + "/"  + token;
  console.log(urls);
  var flag = 0;
  req.body['TOKEN_ID'] = token;
  req.body['IS_ACTIVE'] = "False";
  console.log(req.body);
  connection.query('INSERT INTO SELLER_DETAILS SET ?', req.body, function(err, result) {
    if (err) {
          console.log(err);
          res.json({
            status:false,
            message:err
            })
      }else{
          flag = 1;
          console.log("registered");
          res.json({
             status:true,
             data:result,
             message:'user data entered into the database'
          });
    var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
              user: 'jainshishir18@gmail.com', // admin email id
              pass: '@////////hir' // admin password
      }
    }) 
   var mailOptions = {
                from: 'jainshishir18@gmail.com', // sender address
                to: req.body['EMAIL_ID'], // list of receivers 
                subject: 'Email Confirmation', // Subject line
                text: "Please go to this link to confirm your email  " + urls 
    };

    transporter.sendMail(mailOptions, function(error, info){
              if(error){
                console.log(error);
                } else{
                console.log('Message sent: ' + info.response);
                };
    });
         }
  });
}


module.exports.sendOtp=function(req,res){
  no = req.body["contactNo"]
  var val = Math.floor(1000 + Math.random() * 9000);
  sendOtp.send(no, "ShishirJ", val , function (error, data, response) {
  console.log(data);
  otp = val
  });
}

module.exports.verifyOtp=function(req,res){
   otpNo = req.body["otpNo"]
   console.log(otp);
   console.log(otpNo);
  if ( otpNo != otp ){
    res.json({
             status:false,
             message:'wrong otp'
          });
  }
  else{
      isActive = "True";
     res.json({
             status:true,
             message:'right otp'
          });
  }
}

module.exports.confirmEmail=function(req,res){
  var sql = 'SELECT TOKEN_ID FROM SELLER_DETAILS WHERE EMAIL_ID = "' + req.params.email + '"';
    connection.query(sql, function (err, result) {
      if (err) {
          console.log(err);
      }else{
        if ( result[0].TOKEN_ID == req.params.token ) {
          if ( isActive == "True") {
          var sql2 = 'UPDATE SELLER_DETAILS SET IS_ACTIVE = ' + '"True" ' +  'WHERE EMAIL_ID = "' + req.params.email + '"';
           connection.query(sql2, function (err, result) {
          if (err) {
            console.log(err);
            res.json({
              status:false,
              message:err
            })
          }else{
            console.log("email verified");
            res.write("<h1>Congrats your email is verified and your account is active</h1>");
          }
        })
        }
      else {
           res.write("<h1>First verify your cell phone number</h1>");
      }
    }
    }
  })
}




