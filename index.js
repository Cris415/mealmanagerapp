const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// require('./models/User');
// require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// app.use(
//     cookieSession({
//         maxAge: 30 * 24 * 60 * 60 * 1000, // cookie will last 30 days in ms
//         keys: [keys.cookieKey],
//     })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
    res.send('Welcome!');
});

console.log('hello???');
if (process.env.NODE_ENV === 'production') {
    console.log('is in production');
} else {
    console.log(process.env.NODE_ENV);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
