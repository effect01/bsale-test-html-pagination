const express = require('express')
const app = express();
const path = require('path')
// set 
const port = 2424;
app.set('port', port)
app.set('view engine', 'html')

/// middleware
app.use(express.json());

/// static routes
app.use(express.static( path.join( __dirname , '../public')) );
app.get('/', function(req, res) {
    res.sendFile(path.join( __dirname , '../public/client/index.html'));
  });

app.get('/products', function(req, res) {
    res.sendFile(path.join( __dirname , '../public/client/pages/product.html'));
  });
app.get('/products/:id', function(req, res) {
    res.sendFile(path.join( __dirname , '../public/client/pages/productDetail.html'));
});
  
///  apis routes
app.use('/api/products', require('./routes/products.routes'));
app.use('/api/categories', require('./routes/categories.routes'));

// app 

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
});
  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
