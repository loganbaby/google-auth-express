const express = require('express'),
    app = express(),
    session = require('express-session'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    flash = require('connect-flash');

const host = 'localhost';
const port = 3000;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

function checkAuth() {
    return app.use((req, res, next) => {
        if (req.user) next();
        else res.redirect('/login');
    });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'you secret key' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy(
        {
            clientID: '299938264159-e1adr9g8llm40hbf1n9e5ml1korccc3c.apps.googleusercontent.com', //YOUR GOOGLE_CLIENT_ID
            clientSecret: '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', //YOUR GOOGLE_CLIENT_SECRET
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

app.get('/login', (req, res) => {
   res.send('Login page. Please, authorize.');
});

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/home',
    })
);

app.get('/home', checkAuth(), (req, res) => {
    res.send("Home page. You're authorized.");
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});

