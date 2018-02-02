var connection = require('./../config');
module.exports.login=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    req.session.user = req.body.email;
    Useremail = email;
    console.log(Useremail);
    connection.query('SELECT * FROM SELLER_P_M_VERIFIER WHERE EMAIL_ID = ?',[email], function (error, results, fields) {
      if (error) {
        console.log(error)
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
            console.log(results);
            console.log(password + results[0].PASSWORD)
            if(password==results[0].PASSWORD){
              var sql = 'SELECT IS_ACTIVE FROM SELLER_DETAILS WHERE EMAIL_ID = "' + req.body.email + '"';
              connection.query(sql, function (err, result) {
              if (err) {
                console.log(err);
              }else if ( result[0].IS_ACTIVE == "True" ) {
                  res.json({
                    status:true,
                    message:'successfully authenticated'
                  })
                }
            else {
                res.json({
                  status:false,
                  message:"Please Confirm your email"
                 });
            }
            })
            }
            else{
              res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exists"
          });
        }
      }
    });
}