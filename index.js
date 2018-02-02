var express=require("express");
var bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var session = require('client-sessions');
var formidable = require('formidable');
var multipart = require('connect-multiparty');
var multiparty = require('multiparty'); // https://github.com/andrewrk/node-multiparty
global.Useremail = module.exports = "";

app  = express();

app.use(multipart());
app.use(function(req, res, next) {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        if (req.method === 'OPTIONS') return res.send(200)
    }
    next()
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());


var loginController=require('./controllers/login-controller');
var registerController=require('./controllers/register-controller');
var productsController=require('./controllers/product-controller');
var passwordController=require('./controllers/password-controller');
var warehouseController=require('./controllers/warehouse-controller');
/* route to handle */

app.post('/api/register',registerController.register);
app.post('/api/otp',registerController.sendOtp);
app.post('/login',loginController.login);
app.post('/api/addProducts',  productsController.addProducts);
app.get('/api/fetchProducts', productsController.fetchProducts);
app.post('/api/lostPassword',passwordController.lostPassword);
app.post('/api/addWarehouse',warehouseController.addWarehouse);
app.get('/api/fetchWarehouse',warehouseController.fetchWarehouse);


var server=app.listen(8000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("server running at port" + port);
})



