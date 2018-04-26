const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })
    );

    // Get the code once authenticated and return a userprofile
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.send('ok logged in');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current-user', (req, res) => {
        res.send(req.user);
    });
};
