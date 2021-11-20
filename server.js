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
        sourceMap: true
    })
)

app.use(express.static('public'))
app.use('/', router);

app.listen(process.env["PORT"], process.env["HOST"], () => {
    console.log(`app is running at ${process.env["HOST"]}:${process.env["PORT"]}`)
});