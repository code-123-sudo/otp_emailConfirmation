var connection = require('./../config');
module.exports.addProducts=function(req,res){
	var sql = 'SELECT USER_ID FROM SELLER_DETAILS WHERE EMAIL_ID = "' + Useremail + '"';
  console.log(req.body);
		connection.query(sql, function (err, result) {
  		if (err) {
          console.log(err);
  		}else{
      console.log(result[0].USER_ID);
      req.body.USER_ID = result[0].USER_ID;
		  connection.query('INSERT INTO SELLER_PROD_DETAILS SET ?', req.body, function(err, result) {
    	   if (err) {
           console.log(err);
           res.json({
             status:false,
             message:err
             })
           }else	{
            flag = 1;
            console.log("registered");
            	res.json({
              		status:true,
              		data:result,
              		message:'user data entered into the database'
           		});
        	}
    	});  
		}
  })
}

module.exports.fetchProducts=function(req,res){
  console.log(req.query.id);
  var sql = 'SELECT USER_ID FROM SELLER_DETAILS WHERE EMAIL_ID = "' + Useremail + '"';
    connection.query(sql, function (err, result) {
      if (err) {
          console.log(err);
      }else{
          console.log(result[0].USER_ID)
           var sql = 'SELECT * FROM SELLER_PROD_DETAILS WHERE USER_ID = "' + result[0].USER_ID  + '"' + ' AND CATEGORIES = ' + '"' + req.query.id + '"' ;
        	connection.query(sql, function(err, result) {
            if (err) {
                  console.log(err);
                    res.json({
                      status:false,
                    message:err
                    })
            }else	{
                res.json({
                  status:true,
                  data:result,
                  message:'data fetched from the database'
                });
              }
          });  
        }
      })
  }