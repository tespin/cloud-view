const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const SQLiteStore = require('better-sqlite3-session-store')(session);
const authRouter = require('./routes/auth');
const app = express();
const port = process.env.PORT || 80;
app.listen(port, () => console.log(`listening at port ${port}`));
app.use('/', authRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessions.db', dir: './var/db'})
}));
app.use(passport.authenticate('session'));
app.use(express.json({limit: '1mb'}));

app.post('/api', (request, response) => {
    const data = request.body;
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon,
        api: process.env.API_KEY
    });
});

module.exports = app;