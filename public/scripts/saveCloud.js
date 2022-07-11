document.getElementById('save').addEventListener('click', async (event) => {
    // if image is not undefined

    let img = document.getElementById("result");

    if (img.getAttribute('src') === '') {
        let errorBox = document.getElementById('errorBox');
        errorBox.style.display = 'block';
        errorBox.innerText = "Please obtain a valid image before saving.";

        return console.log("Please obtain a valid image before saving.");
    }
    
    // getBase64Image(img, postBase64);
    let imageArray = await saveImage(img);
    fetchImage(imageArray);
    // console.log(currentSaved[0]);
});

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
    let imageArray = json.user.saved;
    return imageArray;
    // let size = images.length;
    // console.log(size);
    // let gallery = document.getElementById('gallery');

    // let entryDiv = document.createElement('div');
    // entryDiv.className = 'entry';

    // let img = new Image();
    // img.src = images.at(-1);

    // entryDiv.append(img);
    // gallery.append(entryDiv);
}

function fetchImage(imgArray) {
    // let index = 0;
    // imgArray.forEach(element => {
    //     let entryDiv = document.createElement('div');
    //     entryDiv.className = 'entry';

    //     let img = new Image();
    //     img.src = element;
    //     img.dataset.index = index;
    //     entryDiv.append(img);
    //     gallery.append(entryDiv);
    //     index++;
    // });

    let entryDiv = document.createElement('div');
    entryDiv.className = 'entry';

    let img = new Image();
    img.src = imgArray.at(-1);
    img.dataset.index = imgArray.length-1;

    entryDiv.append(img);
    gallery.append(entryDiv);

    selectImages();
}

function selectImages() {
    let imgs = document.querySelectorAll("div#gallery img");
    let toBeDeleted = [];
    imgs.forEach(img => {
        // img.remove();
        // let showBorder = false;
        img.addEventListener('click', event => {
            // showBorder != showBorder;
            // console.log(showBorder);
            // console.log(savedImages.length);
            let selected = event.target;
            if (selected.style.border == "") {
                selected.style.border = "3px solid #005180";
                toBeDeleted.push(selected.dataset.index);
                console.log(`Image ${selected.dataset.index} selected`)
                console.log(`Images to be deleted: ${toBeDeleted}`);
            } else {
                selected.style.border = "";
                toBeDeleted.splice(selected.dataset.index, 1);
                console.log(`Image ${selected.dataset.index} deselected`)
                console.log(`Images to be deleted: ${toBeDeleted}`);
            }
        });
    });
}

// async function fetchImages() {
//     // console.log('posting:');
//     // console.log(dateUrl);
//     const options = {
//         method: 'POST', headers: {
//             'Content-Type': 'application/json'
//         },
//     };

//     const response = await fetch('clouds', options);
//     const json = await response.json();
//     // console.log(json.user);

//     let savedImages = json.user.saved;
//     let gallery = document.getElementById('gallery');

//     let index = 0;
//     savedImages.forEach(element => {
//         let entryDiv = document.createElement('div');
//         entryDiv.className = 'entry';

//         let img = new Image();
//         img.src = element;
//         img.dataset.index = index;
//         entryDiv.append(img);
//         gallery.append(entryDiv);
//         index++;
//     });
// }

// function getBase64Image(img, cb) {
//     let errorBox = document.getElementById('errorBox');
//     errorBox.style.display = "none";

//     let canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;
//     let ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);
//     let dataURL = canvas.toDataURL("image/png");
//     // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
//     cb(dataURL);
//   }
  
// async function postBase64(base64) {
//     // console.log('posting:');
//     // console.log(dateUrl);
//     const data = { base64 };
//     const options = {
//         method: 'POST', headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     };

//     const response = await fetch('save', options);
//     const json = await response.json();
//     let images = json.user.saved;
//     // let size = images.length;
//     // console.log(size);
//     let gallery = document.getElementById('gallery');

//     let entryDiv = document.createElement('div');
//     entryDiv.className = 'entry';

//     let img = new Image();
//     img.src = images.at(-1);

//     entryDiv.append(img);
//     gallery.append(entryDiv);
// }