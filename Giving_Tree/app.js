
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 수정하기
var indexRouter = require('./routes/index.js');
var loginRouter = require('./routes/login.js');
var productRouter = require('./routes/product.js')
var uploadRouter = require('./routes/upload.js');
var storyRouter = require('./routes/story.js');
var mypageRouter = require('./routes/mypage.js');
var mypageadminRouter = require('./routes/mypage_admin.js');
var agreementRouter = require('./routes/agreement.js');
var updateRouter = require('./routes/update.js');
var loadmoreRouter = require('./routes/loadmore.js');





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({limit: "100mb"}));
app.use(express.urlencoded({ limit:"100mb", extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 수정하기 
app.use('/',indexRouter);
app.use('/login', loginRouter);
app.use('/product', productRouter);
app.use('/upload', uploadRouter);
app.use('/story', storyRouter);
app.use('/mypage', mypageRouter);
app.use('/mypage_admin', mypageadminRouter);
app.use('/agreement', agreementRouter);
app.use('/update', updateRouter);
app.use('/loadmore', loadmoreRouter);



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
