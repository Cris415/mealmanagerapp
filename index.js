const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Recipe');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // cookie will last 30 days in ms
        keys: [keys.cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/recipeRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    //  Serve prodution assets like a particular file
    app.use(express.static('client/build'));

    // Serve index.html file for paths not in the server
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
