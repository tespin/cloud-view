// window.addEventListener('load', async (event) => {
//     await fetchErrors();
//     // const savedImages = await fetchImages();
//     // addImages(savedImages, index_object);
// })

const loginForm = document.getElementById('login');
loginForm.addEventListener('submit', event =>  {
    console.log('submitted');
})

async function fetchErrors() {
    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }
    };

    const errs_response = await fetch('signupLoginErrors', options);
    const errs_json = await errs_response.json();

    console.log(errs_json);
}