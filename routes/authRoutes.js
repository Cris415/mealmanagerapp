const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })
    );

    // Get the code once authenticated and return a userprofile
    app.get('/auth/google/callback', passport.authenticate('google'));
};
