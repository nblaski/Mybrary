if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' });
};
//did the pull work
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));


const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true});
// mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex : true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));


app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);



var port = process.env.PORT || 3030;
Promise.resolve(app.listen(port)).then(() => {
   console.log("Running!");
});

// app.listen(process.env.PORT || 3000, ( req, res) => {
//     console.log('Server listening on port 3000');
// });
