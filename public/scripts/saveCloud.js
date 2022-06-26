document.getElementById('save').addEventListener('click', event => {
    // if image is not undefined

    let img = document.getElementById("result");
    // console.log(img.src);
    // console.log(getBase64Image(img));
    let base64 = getBase64Image(async img => {
        console.log('retrieving');
    });
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

function getBase64Image(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL = canvas.toDataURL("image/png");
    // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    return dataURL;
  }
  