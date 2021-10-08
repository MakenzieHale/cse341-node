const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorController = require('./controllers/404');
const User = require('./models/user');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://makenzieHale:5AETzsTFvEkG2oTy@cse341cluster-3dwlw.mongodb.net/test?retryWrites=true&w=majority";


const app = express();

const corsOptions = {
    origin: "https://cseweek2prove.herokuapp.com/",
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,

    family: 4
};





app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('615bce118c13cdeeee19e22b')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

mongoose.connect(MONGODB_URL,options)
.then(result =>{
  User.findOne().then(user=>{
    if (!user) {
      const user = new User({
        name: 'Makenzie',
        email: 'makenzie@test.com',
        cart:{
          items: []
        }
      });
      user.save();
    }
  });
  
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}).catch(err =>{
  console.log(err);
});



