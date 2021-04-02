const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()

const router = require('./routers/router')

const session =require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const puerto = (process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//router
app.use('/',router)

app.use(express.static(path.join(__dirname,'public')));

app.listen(puerto,()=>{
    console.log('Server on port http://localhost:'+puerto);
})
