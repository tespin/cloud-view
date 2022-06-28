const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// // const SQLiteStore = require('connect-sqlite3')(session);
const authRouter = require('./routes/auth');
const app = express();
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 80;

app.listen(port, () => console.log(`listening at port ${port}`));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
        uri: process.env.MONGO_URI,
        collection: 'sessions'
    }, function(error) {
        console.log(`error with store: ${error}`)
    })
    // cookie: { secure: true } 
}));
app.use(passport.authenticate('session'));
app.use('/', authRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api', (request, response) => {
    const data = request.body;
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon,
        api: process.env.API_KEY
    });
});

app.post('/save', (request, response) => {
    const data = request.body;
    response.json({
        status: 'success',
        base64: data.base64
    });
});

module.exports = app;