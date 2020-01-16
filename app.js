const express = require('express');
const bodyParser= require('body-parser');
const cookieParser= require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser()); 

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const name = req.cookies.username;
    res.render('index', {name:name });
});

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?", hint:"Think about whose tomb it is "});
});

app.get('/hello', (req, res) => {
    res.render('hello');
});

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

app.get('/sandbox', (req, res) => {
    res.render('sandbox');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});