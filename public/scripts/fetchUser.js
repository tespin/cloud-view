window.addEventListener('load', async (event) => {
    await fetchUser();
    // event.preventDefault();
    // const savedImages = await fetchImages();
    // addImages(savedImages, index_object);
})

// const loginForm = document.getElementById('login');
// loginForm.addEventListener('submit', event =>  {
//     fetchErrors();
//     event.preventDefault();
// })

async function fetchUser() {
    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        },
    };

    const user_response = await fetch('user', options);
    const user_json = await user_response.json();

    console.log(user_json);

    if (user_json == 'SUCCESS') {
        
    }
}