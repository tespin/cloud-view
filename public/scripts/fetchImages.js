let index_object = { index: 0 };
let selected = [];
let indices = [];

const download_btn = document.getElementById('download');
const delete_btn = document.getElementById('delete');

window.addEventListener('load', async (event) => {
    await fetchImages();
    // const savedImages = await fetchImages();
    // addImages(savedImages, index_object);
})

document.getElementById('download').addEventListener('click', async (event) => {
    clearInfo();

    download_btn.classList.add('onhover');
    const btnDiv = document.getElementById('storageBtns');
    const apiInfo = document.createElement('div');
    apiInfo.id = 'apiInfo';
    apiInfo.classList.add('errorBox');
    apiInfo.innerText = 'Downloading images ...';
    btnDiv.after(apiInfo);
    
    // const options = {
    //     method: 'POST', headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // };

    const all_imgs = document.querySelectorAll('.entry img');
    all_imgs.forEach(async element => {
        if (selected.includes(element.dataset.id)) {
            const base64 = await fetch(element.src);
            const blob = await base64.blob();
            // console.log(element.src);
            // console.log(element.url);
            // const blob = element.src.blob();
            const download_url = URL.createObjectURL(blob);
            const oid = element.dataset.id;
            const fn = oid.slice(-4);

            const linkElement = document.createElement('a');
            linkElement.href = download_url;
            linkElement.download = `cloud_${fn}`;
            linkElement.click();

            clearInfo();
            delete_btn.classList.remove('onhover');
            selected = [];
            enableButtons();
            // apiInfo.classList.add('success');
            // apiInfo.innerText = 'Images successfully downloaded.';
        } else {
            apiInfo.classList.add('error');
            apiInfo.innerText = 'There was an error with the selected image(s). Please reload the page.';
        }
    })
    // const options = {
    //     method: 'POST', headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // };
});

document.getElementById('delete').addEventListener('click', async (event) => {
    clearInfo();

    delete_btn.classList.add('onhover');
    const btnDiv = document.getElementById('storageBtns');
    const apiInfo = document.createElement('div');
    apiInfo.id = 'apiInfo';
    apiInfo.classList.add('errorBox');
    apiInfo.innerText = 'Deleting images ...';
    btnDiv.after(apiInfo);
    const data = {selected};
    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const delete_res = await fetch('delete', options);
    const delete_json = await delete_res.json();

    if (delete_json.status == 'OK') {
        const all_imgs = document.querySelectorAll('.entry img');
        all_imgs.forEach(element => {
            if (selected.includes(element.dataset.id)) {
                const entry = element.closest('.entry');
                entry.remove();
                console.log(`element ${element.dataset.id} removed`);
            }
        })

        apiInfo.classList.add('success');
        apiInfo.innerText = 'Images successfully deleted.';
        delete_btn.classList.remove('onhover');
        selected = [];
        enableButtons();
    }
});

async function fetchImages() {
    const gallery = document.getElementById('gallery');

    // const container = document.getElementById('container');
    // const placeholder = document.createElement('div');
    // placeholder.id = 'placeholder';
    // const progress = document.createElement('p');
    
    const btnDiv = document.getElementById('storageBtns');
    const apiInfo = document.createElement('div');
    apiInfo.id = 'apiInfo';
    apiInfo.classList.add('errorBox');
    apiInfo.innerText = 'Fetching images ...';
    btnDiv.after(apiInfo);

    // progress.innerText = 'Fetching images ...';
    
    // placeholder.append(progress);
    // container.append(placeholder);

    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }
    };

    const imgs_response = await fetch('clouds', options);
    const imgs_json = await imgs_response.json();

    const all_saved_imgs = imgs_json.user.saved;
    if (all_saved_imgs.length > 0) {
        clearInfo();
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
        apiInfo.innerText = 'Your Cloud Storage is empty. Add to it by saving an image on the Home page.';
    }
}

function enableButtons() {
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

function clearInfo() {
    const apiInfo = document.getElementById('apiInfo');
    if (apiInfo) apiInfo.remove();
}