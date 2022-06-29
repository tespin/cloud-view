// const { response } = require("../../app");

document.getElementById('save').addEventListener('click', event => {
    // if image is not undefined

    let img = document.getElementById("result");

    if (img.getAttribute('src') === '') {
        let p = document.createElement('p');
        p.innerText = "Please obtain a valid image before saving.";
        resDiv.append(p);

        return console.log("Please obtain a valid image before saving.");
    }
    
    getBase64Image(img, postBase64);

    // let base64 = getBase64Image(img, postBase64);
    // console.log(img.src);
    // console.log(getBase64Image(img));
    // let base64 = getBase64Image(async img => {
    //     console.log('retrieving');
    // });
    // let base64 = getBase64Image(async img => {
    //     const data = { base64 };

    //     const options = {
    //         method: 'POST', headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     };

    //     const response = await fetch('save', options);
    //     const json = await response.json();
    //     console.log(json.base64);
    // });
});

function getBase64Image(img, cb) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL = canvas.toDataURL("image/png");
    // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    cb(dataURL);
  }
  
async function postBase64(base64) {
    // console.log('posting:');
    // console.log(dateUrl);
    const data = { base64 };
    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('save', options);
    const json = await response.json();
    let images = json.user.saved;
    console.log(images.at(-1));
    let gallery = document.getElementById('gallery');

    let entryDiv = document.createElement('div');
    entryDiv.className = 'entry';

    let img = new Image();
    img.src = images.at(-1);

    entryDiv.append(img);
    gallery.append(entryDiv);
    // let savedImages = json.user.saved;
    
    

    // let gallery = document.getElementById('gallery');

    // savedImages.forEach(element => {
    //     let entryDiv = document.createElement('div');
    //     entryDiv.className = 'entry';

    //     let img = new Image();
    //     img.src = element;

    //     entryDiv.append(img);
    //     gallery.append(entryDiv);
    // });
}