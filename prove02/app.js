const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const expresshbs = require('express-handlebars');

const app = express();

//pug
// app.set('view engine', 'pug');
// app.set('views','views');

// handlebars
// app.engine('hbs',expresshbs({layoutsDir:'views/layouts/', defaultLayout:'main-layout', extname:'hbs'}));
// app.set('view engine', 'hbs');
// app.set('views','views');

//ejs
app.set('view engine', 'ejs');
app.set('views','views');



const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminData.routes);
app.use(shopRoutes); 

app.use((req,res,next)=>{
    res.status(404).render('404.ejs',{pageTitle:'404 Error' });
    
});




app.listen(process.env.PORT || 5000);

