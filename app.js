const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
let MongoDBStore = require('connect-mongodb-session')(session);

let store = new MongoDBStore({  
    uri: process.env.MONGO_URI,
    databaseName: 'database',
    collection: 'sessions'
}, function(error) {
    console.log(`error with store: ${error}`)
});

store.on('error', function(error) {
    console.log(`store on error: ${error}`);
})

const authRouter = require('./routes/auth')
const app = express();
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`listening at port ${port}`));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: store
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

// app.post('/save', (request, response) => {
//     const data = request.body;
//     console.log(`request made by ${request.user.username}`);
//     response.json({
//         status: 'success',
//         base64: data.base64
//     });
// });

module.exports = app;