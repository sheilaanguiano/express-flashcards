const express = require('express');
const bodyParser= require('body-parser');
const cookieParser= require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use('/static', express.static('public')); 

app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

//   ------------ ERROR HANDLERs --------
app.use((req, res, next) => {
    const  err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.render('error');
  });

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

// ---------  SANDBOX -----------
 

app.get('/sandbox', (req, res) => {
    res.render('sandbox');
});


app.listen(1337, () => {
    console.log('The application is running on localhost:1337!')
});