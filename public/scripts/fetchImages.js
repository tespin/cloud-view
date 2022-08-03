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
            // img.dataset.index = obj.index;

            const dateDiv = document.createElement('p');
            dateDiv.classList.add('date');
            dateDiv.innerText = date;

            const cbox = document.createElement('input');
            cbox.type = 'checkbox';
            cbox.classList.add('check');

            entryDiv.addEventListener('click', event => {
                event.stopPropagation();
                const current_cbox = event.currentTarget.querySelector('input');
                // const current_img = event.currentTarget.querySelector('img');
                // const current_cbox = this.querySelector('input');
                // const current_cbox = event.target.querySelector('input');
                // const current_cbox = current.querySelector('input');
                if (current_cbox.checked == false) {
                    current_cbox.checked = true;
                    // current_img.classList.add('darken');
                    selected.push(img_id);
                } else {
                    current_cbox.checked = false;
                    // current_img.classList.remove('darken');
                    let idx = selected.indexOf(img_id);
                    if (idx > -1) { selected.splice(idx, 1); }
                }
                console.log(selected);
            })



            // img.addEventListener('click', event => {
            //     const current = event.target;
            //     if (current.style.border == "") {
            //         current.style.border = "2px solid #005180";
            //         selected.push(img_id);
            //         // indices.push(current.dataset.index);
            //         // console.log(`Image ${current.dataset.index} selected`)
            //         // console.log(`Image ${imgId} selected`)
            //         // console.log(`Images to be deleted: ${selected}`);
            //     } else {
            //         current.style.border = "";
            //         let idx = selected.indexOf(img_id);
            //         if (idx > -1) { selected.splice(idx, 1); }
            //         // console.log(`Image ${imgId} deselected`)
            //         // console.log(`Images to be deleted: ${selected}`);
            //     }

            //     console.log(selected);
            // })

            // img.addEventListener('clickl', event => {
            //     const current = event.target;
            // })

            entryDiv.append(cbox);
            entryDiv.append(img);
            entryDiv.append(dateDiv);
            gallery.append(entryDiv);
        })
    } else {
        progress.innerText = 'Your Cloud Storage is empty. Add to it on the Home page.';
    }
}