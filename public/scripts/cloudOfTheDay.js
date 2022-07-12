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
        }
    };
    let allSavedImages = await fetch('cotd', options);
    const json = await allSavedImages.json();
    console.log(json.res);
})