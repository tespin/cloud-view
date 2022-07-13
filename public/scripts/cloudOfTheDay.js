window.addEventListener('load', async (event) => {
    // let savedImages = await fetchImages();
    // addImages(savedImages, indxObject);

    // const userOptions = {
    //     method: 'POST', headers: {
    //         'Content-Type': 'application/json'
    //     }
    // };

    // let userBox = document.getElementById('usernameBox');
    // const username = await fetch('user', userOptions);
    // const json = await username.json();

    // userBox.innerText = json.user.username;
    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    };
    let allSavedImages = await fetch('cotd', options);
    const json = await allSavedImages.json();
    console.log(json.res);

    // could also just push every submission of the day into an array
    // and randomly pick from there

    // empty array to store all clouds
    // iterate through every user
        // go into each user's array of saved images
            // push src to empty cloud array

    // randomly pick one
        // create new image and set its src to random selection

})

// app.post('/api', (request, response) => {
//     const data = request.body;
//     response.json({
//         status: 'success',
//         latitude: data.lat,
//         longitude: data.lon,
//         api: process.env.API_KEY
//     });
// });