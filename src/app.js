
const express = require('express');
// const createError = require('http-errors');
var path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
var cors = require('cors')
const Socket = require('./utils/socket/socket.js');
const port = process.env.PORT || 3001;


var app = express();
app.use(cors());
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.engine('ejs', require('ejs').renderFile);

// const authapi = require('./routes/auth.route.js');
const auth = require('./routes/auth.js');
// const employee = require('./routes/employee.js');
// const product = require('./routes/productions.js');
// const managementRole = require('./routes/management-user.js');
const absensi = require('./routes/absensi.js');
const cuti = require('./routes/cuti.js');
const user = require('./routes/user.js');
// const dashboardAnalytic = require('./routes/dashboard-analytic.js');

// app.use(logger('dev'));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../public/')));
// app.use(cookieParser());

// app.use('/static', express.static('public'))
// console.log("LOG-__dirname", __dirname)
// app.use(express.static(__dirname + '../public/'));

var corsOptions = {
  origin: 'http:/127.0.0.1',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) chok
}

app.use('/auth', auth);
// app.use('/', dashboard);
// app.use('/dashboard', dashboardAnalytic);
app.use('/user', user);
// app.use('/employee', employee);
// app.use('/product', product);
// app.use('/management-user', managementRole);
app.use('/attendance', absensi);
app.use('/leave', cuti);
// app.use('/dashboard/category', categoryRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.get('*', function (req, res) {
  res.send('no route ...', 404);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log('Log-Error', err)
  res.status(err.status || 500);
  res.render('error');
});



// app.listen(port, () => {
//   console.log('Running Server: ', port);
//   // db.Ping()
// });

// const io = socketio(server)

// io.on('connection', (socket) => {
//   console.log('New connection')
//   socket.on('message', (data) => {
//     console.log(`New message from ${socket.id}: ${data}`);
//   })
// })


const server = http.createServer(app);
// const { SocketInstance } = Socket.createSocket(server);
// SocketInstance(server);


server.listen(port, () => {
  console.log('Running Server: ', port);
  // db.Ping()
})
// module.exports = app;