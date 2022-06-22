const express = require('express');
const app = express();
const port = process.env.PORT || 80;
app.listen(port, () => console.log(`listening at port ${port}`));
// app.use(express.static('public'));
app.route('/').get((req, res) => {
    res.sendFile('/views/first.html');
});
app.use(express.static(__dirname + '/public'));

// app.set('views', path.join(__dirname, 'views'));
app.use(express.json({limit: '1mb'}));
// app.route('/').get((req, res) => {
//     console.log(path.join(__dirname + '/views/index.html'));
//     res.sendFile(path.join(__dirname + '/views/index.html'));
// });
app.post('/api', (request, response) => {
    const data = request.body;
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon,
        api: process.env.API_KEY
    });
});