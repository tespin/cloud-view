let index_object = { index: 0 };
let selected = [];
let indices = [];

window.addEventListener('load', async (event) => {
    await fetchImages();
    // const savedImages = await fetchImages();
    // addImages(savedImages, index_object);
})

document.getElementById('download').addEventListener('click', async (event) => {
    console.log('download button clicked');
});

document.getElementById('delete').addEventListener('click', async (event) => {
    const data = {selected};
    console.log(data);
    // const options = {
    //     method: 'POST', headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // };
    // const delete_res = await fetch('delete', options);
    // const delete_json = await delete_res.json();

    // if (delete_json.status == 'OK') {
        

    // }
});

async function fetchImages() {
    const gallery = document.getElementById('gallery');

    const container = document.getElementById('container');
    const placeholder = document.createElement('div');
    placeholder.id = 'placeholder';
    const progress = document.createElement('p');
    progress.innerText = 'Fetching images ...';
    
    placeholder.append(progress);
    container.append(placeholder);

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
            img.dataset.id = element._id;

            const dateDiv = document.createElement('p');
            dateDiv.classList.add('date');
            dateDiv.innerText = date;

            const cbox = document.createElement('input');
            cbox.type = 'checkbox';
            cbox.classList.add('check');

            cbox.addEventListener('click', event => {
                const current_cbox = event.currentTarget;
                if (current_cbox.checked == false) {
                    let idx = selected.indexOf(img_id);
                    if (idx > -1) { 
                        selected.splice(idx, 1); 
                        // console.log('removed');
                    }
                } else {
                    selected.push(img_id);
                    // console.log('added');
                }
                // console.log(selected);
                enableButtons();
                event.stopPropagation();
            });

            entryDiv.addEventListener('click', event => {
                const current_cbox = event.currentTarget.querySelector('input');
                if (current_cbox.checked == false) {
                    current_cbox.checked = true;
                    selected.push(img_id);
                } else {
                    current_cbox.checked = false;
                    let idx = selected.indexOf(img_id);
                    if (idx > -1) { selected.splice(idx, 1); }
                }
                enableButtons();
                event.stopPropagation();
            });

            entryDiv.append(cbox);
            entryDiv.append(img);
            entryDiv.append(dateDiv);
            gallery.append(entryDiv);
        })
    } else {
        progress.innerText = 'Your Cloud Storage is empty. Add to it by saving an image on the Home page.';
    }
}

function enableButtons() {
    const download_btn = document.getElementById('download');
    const delete_btn = document.getElementById('delete');
    if (download_btn) {
        if (selected.length > 0) {
            download_btn.removeAttribute('disabled');
        } else {
            download_btn.setAttribute('disabled', '');
        }
    }

    if (delete_btn) {
        if (selected.length > 0) {
            delete_btn.removeAttribute('disabled');
        } else {
            delete_btn.setAttribute('disabled', '');
        }
    }
}