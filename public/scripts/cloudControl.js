let indxObject = { index: 0 };

window.addEventListener('load', async (event) => {
    console.log('page loaded');
    
    let savedImages = await fetchImages();
    addImages(savedImages, indxObject);

})

document.getElementById('save').addEventListener('click', async (event) => {
    console.log('save button clicked');
})

async function fetchImages() {
    // console.log('posting:');
    // console.log(dateUrl);
    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        },
    };

    const response = await fetch('clouds', options);
    const json = await response.json();
    // console.log(json.user);

    let savedImages = json.user.saved;
    return savedImages;
    // let gallery = document.getElementById('gallery');

    // let index = 0;
    // savedImages.forEach(element => {
    //     let entryDiv = document.createElement('div');
    //     entryDiv.className = 'entry';

    //     let img = new Image();
    //     img.src = element;
    //     img.dataset.index = index;
    //     entryDiv.append(img);
    //     gallery.append(entryDiv);
    //     index++;
    // });
}

function addImages(imgs, obj) {
    let gallery = document.getElementById('gallery');
    imgs.forEach(element => {
        let entryDiv = document.createElement('div');
        entryDiv.className = 'entry';

        let img = new Image();
        img.src = element;
        img.dataset.index = obj.index;
        entryDiv.append(img);
        gallery.append(entryDiv);
        obj.index++;
    })
}