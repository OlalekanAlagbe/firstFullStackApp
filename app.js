require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const { flash } = require('express-flash-message');
const session = require('express-session')
const connectDB = require('./server/config/db');


const app = express();
const port = 5000 || process.env.PORT;

//Connect to Database
connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(methodOverride('_method'))



//Static files
app.use(express.static('public'));
app.use('public',express.static('public'));

//Express session

    // app.use(
    //     session({
    //         secret: 'secret',
    //         resave: false,
    //         saveUninitialized: true,
    //         cookie: {
    //             maxAge: 1000 * 60 * 60 * 24 * 7,
    //         }
    //     })
    // );

    // //Flash messages

    // app.use(flash ({sessionKeyName: 'flashMessage'}))

//Templating Engine

app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


//Home

 

//Routes

app.use('/', require('./server/routes/customer'))


//Hande 404

app.get('*', (req,res)=>{
    res.status(404).render('404');
})


app.listen(port, ()=>{
    console.log(`App is listeniing of port ${port}`)
})