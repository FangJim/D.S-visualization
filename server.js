require('dotenv').config();

const express = require('express');
const router = require('./routes/router')
const sassMiddleware = require('node-sass-middleware')
const path = require('path')

const app = express();

app.set('view engine', 'pug');
//set app use
app.use(
    sassMiddleware({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        debug: true,
        indentedSyntax: false,
        sourceMap: true,
        outputStyle: 'compressed'
    })
)

// app.use(express.static(__dirname + '/public'));
app.use(express.static('public'))
app.use('/', router);

app.listen(3000, '127.0.0.1', () => {
    console.log(`app is running`)
});