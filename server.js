if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' });
};

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');
<<<<<<< HEAD
mongoose.connect(process.env.DATABASE_URL);
=======
mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex : true});
>>>>>>> e0b742e446b713c64445eea4506016c5a5c1048d
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));


app.use('/', indexRouter)

app.listen(process.env.PORT || 3000, ( req, res) => {
    console.log('Server listening on port 3000');
});
