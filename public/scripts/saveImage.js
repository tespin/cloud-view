document.getElementById('save').addEventListener('click', async (event) => {
    const img = document.getElementById('result');
    // const savedImage = await saveImage(img);
    await (saveImage(img));
})

async function saveImage(image) {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    const base64 = canvas.toDataURL("image/png");

    const base64_data = {base64};
    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(base64_data)
    };

    const saved_response = await fetch('save', options);
    const saved_json = await saved_response.json();
    
    // const data = {lat, lon};
    //         const options = {
    //             method: 'POST', headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)
    //         };
    //         // fetch('/api', options).then(response => {
    //         //     console.log(response);
    //         // });
    //         const response = await fetch('api', options);
    //         const json = await response.json();

    /* testing function saved function
    const saved_json = {
        status: 'OK'
    };*/

    if (saved_json.status == "OK") {
        const apiInfo = document.getElementById('apiInfo');
        apiInfo.style.color = "#11A655";
        apiInfo.innerText = "Image successfully saved. Go to your Cloud Storage to view.";
        apiInfo.style.display = "block";
    }

    // const b64 = api_json.b64;
    // const date = api_json.date;
    // const oid = api_json.oid;

    // return [{b64, date, oid}];
}

