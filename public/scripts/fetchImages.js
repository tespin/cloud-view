let index_object = { index: 0 };
let selected = [];
let indices = [];

window.addEventListener('load', async (event) => {
    // const userOptions = {
    //     method: 'POST', headers: {
    //         'Content-Type': 'application/json'
    //     }
    // };

    await fetchImages();
    // const savedImages = await fetchImages();
    // addImages(savedImages, index_object);
})

async function fetchImages() {
    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }
    };

    const imgs_response = await fetch('clouds', options);
    const imgs_json = await imgs_response.json();

    const all_saved_imgs = imgs_json.user.saved;

    const gallery = document.getElementById('gallery');
    all_saved_imgs.forEach(element => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');

        const img = new Image();
        const img_id = element._id;
        const date = element.date;
        img.src = element.url;
        img.dataset.index = obj.index;

        const dateDiv = document.createElement('p');
        dateDiv.classList.add('date');
        dateDiv.innerText = date;

        // img.addEventListener('clickl', event => {
        //     const current = event.target;
        // })

        entryDiv.append(img);
        entryDiv.append(dateDiv);
        gallery.append(entryDiv);
    })
}