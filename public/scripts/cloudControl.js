let indxObject = { index: 0 };
let selected = [];

window.addEventListener('load', async (event) => {
    console.log('page loaded');
    
    let savedImages = await fetchImages();
    addImages(savedImages, indxObject);

})

document.getElementById('save').addEventListener('click', async (event) => {
    console.log('save button clicked');

    let img = document.getElementById("result");

    if (img.getAttribute('src') === '') {
        let errorBox = document.getElementById('errorBox');
        errorBox.style.display = 'block';
        errorBox.innerText = "Please obtain a valid image before saving.";

        return console.log("Please obtain a valid image before saving.");
    }
    
    // getBase64Image(img, postBase64);
    let savedImage = await saveImage(img);
    addImages(savedImage, indxObject);
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

async function saveImage(image) {
    
    let errorBox = document.getElementById("errorBox");
    errorBox.style.display = "none";

    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    let base64 = canvas.toDataURL("image/png");

    const data = { base64 };
    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('save', options);
    const json = await response.json();

    return [base64];
}

function addImages(imgs, obj) {
    let gallery = document.getElementById('gallery');
    imgs.forEach(element => {
        let entryDiv = document.createElement('div');
        entryDiv.className = 'entry';

        let img = new Image();
        img.src = element;
        img.dataset.index = obj.index;

        img.addEventListener('click', event => {
            let current = event.target;
            if (current.style.border == "") {
                current.style.border = "3px solid #005180";
                selected.push(current.dataset.index);
                console.log(`Image ${selected.dataset.index} selected`)
                console.log(`Images to be deleted: ${toBeDeleted}`);
            } else {
                selected.style.border = "";
                let idx = toBeDeleted.indexOf(selected.dataset.index);
                if (idx > -1) { toBeDeleted.splice(idx, 1); }
                console.log(`Image ${selected.dataset.index} deselected`)
                console.log(`Images to be deleted: ${toBeDeleted}`);
            }
        })

        entryDiv.append(img);
        gallery.append(entryDiv);
        obj.index++;
    })
}

// function selectImages() {
//     let imgs = document.querySelectorAll("div#gallery img");
//     let toBeDeleted = [];
//     imgs.forEach(img => {
//         // img.remove();
//         // let showBorder = false;
//         img.addEventListener('click', event => {
//             // showBorder != showBorder;
//             // console.log(showBorder);
//             // console.log(savedImages.length);
//             let selected = event.target;
//             if (selected.style.border == "") {
//                 selected.style.border = "3px solid #005180";
//                 toBeDeleted.push(selected.dataset.index);
//                 console.log(`Image ${selected.dataset.index} selected`)
//                 console.log(`Images to be deleted: ${toBeDeleted}`);
//             } else {
//                 selected.style.border = "";
//                 let idx = toBeDeleted.indexOf(selected.dataset.index);
//                 if (idx > -1) { toBeDeleted.splice(idx, 1); }
//                 console.log(`Image ${selected.dataset.index} deselected`)
//                 console.log(`Images to be deleted: ${toBeDeleted}`);
//             }
//         });
//     });
// }