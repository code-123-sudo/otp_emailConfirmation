var connection = require('./../config');
var nodemailer=require('nodemailer');

module.exports.resetPassword=function(req,res){
    console.log("here");
    var email=req.body.email;
    console.log(email);
    var oldPassword=req.body.oldPassword;
    var newPassword=req.body.newPassword;

    connection.query('SELECT * FROM SELLER_DETAILS WHERE EMAIL_ID = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
            if ( oldPassword == results[0].PASSWORD ){
              console.log("here");

            connection.query('UPDATE SELLER_DETAILS SET PASSWORD = ? WHERE EMAIL_ID = ?',
              [newPassword, email], function (error, results, fields) {
              if (error) {
              console.log("error", error);
              }
              else{
                res.json({
                  status:true,
                  data:results,
                  message:'password updated'
              });
            }
          });
        }
        else {
          res.json({
                  status:false,
                  message:'password do not match'
          });
        }
      }
      else {
        res.json({
                  status:false,
                  message:'email does not exist'
        });
      }
    }
  })
};
