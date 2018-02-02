var connection = require('./../config');

module.exports.addWarehouse=function(req,res){
	connection.query('INSERT INTO WAREHOUSE_ADDRESS SET ?', req.body, function(err, result) {
    if (err) {
          console.log(err);
          res.json({
            status:false,
            message:err
            })
      }else{
          flag = 1;
          console.log("warehouse added");
          res.json({
             status:true,
             data:result,
             message:'warehouse data entered into the database'
          });
        }
  });
}

module.exports.fetchWarehouse=function(req,res){
  var sql = 'SELECT USER_ID FROM SELLER_DETAILS WHERE EMAIL_ID = "' + Useremail + '"';
    connection.query(sql, function (err, result) {
      if (err) {
          console.log(err);
      }else{
          connection.query('SELECT * FROM SELLER_PROD_DETAILS WHERE USER_ID = ?',result[0].USER_ID , function(err, result) {
            if (err) {
                  console.log(err);
            }else {
               for ( i = 0 ;  i < result.length ; i++ ) {
                  connection.query('SELECT * FROM WAREHOUSE_ADDRESS WHERE PRODUCT_ID = ?',result[i].PRODUCT_ID , function(err, result) {
                    if (err) {
                      console.log(err);
                    }
                    else {
                      console.log(result);
                        //  res.json({
                        //   status:true,
                        //    data:result,
                        // })
                    }
                  });
                } 
            }
          });
        }
    });
}

