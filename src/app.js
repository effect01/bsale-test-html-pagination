const express = require('express')
const app = express();
const path = require('path')
// set 
const port = process.env.PORT || 3000;
app.set('port',port )
// set engine as ejs to be enable html in render
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, '../public/')));
app.set('views', path.join(__dirname, '../public/client'));

/// middleware
app.use(express.json());

/// view routes
app.get('/', function(req, res) {
  res.render('index.html');
  });
app.get('/productos', function(req, res) {
    res.render('Pages/products.html' );
  });
app.get('/producto/:id', function(req, res) {
    res.render('pages/productDetail.html');
});
  
///  APIS routes
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
