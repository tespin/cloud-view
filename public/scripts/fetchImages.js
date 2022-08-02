let index_object = { index: 0 };
let selected = [];
let indices = [];

window.addEventListener('load', async (event) => {
    await fetchImages();
    // const savedImages = await fetchImages();
    // addImages(savedImages, index_object);
})

async function fetchImages() {
    const gallery = document.getElementById('gallery');
    const placeholder = document.createElement('div');
    placeholder.id = 'placeholder';
    const progress = document.createElement('p');
    progress.innerText = 'Fetching images ...';
    
    placeholder.append(progress);
    gallery.append(placeholder);

    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }
    };

    const imgs_response = await fetch('clouds', options);
    const imgs_json = await imgs_response.json();

    const all_saved_imgs = imgs_json.user.saved;
    if (all_saved_imgs.length > 0) {
        placeholder.style.display = 'none';
        // const gallery = document.getElementById('gallery');
        all_saved_imgs.forEach(element => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');

            const img = new Image();
            const img_id = element._id;
            const date = element.date;
            img.src = element.url;
            // img.dataset.index = obj.index;

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
    } else {
        progress.innerText = 'Your Cloud Storage is empty. Add to it on the Home page.';
    }
}