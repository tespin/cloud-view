document.getElementById('save').addEventListener('click', async (event) => {
    const img = document.getElementById('result');
    const savedImage = await saveImage(img);

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
        body: JSON.stringify(data)
    };

    // const saved_response = fetch('saved', options);
    // const saved_json = await (await saved_response).json();
    const saved_json = {
        status: 'OK'
    };

    if (saved_json.status == "OK") {
        const apiInfo = document.getElementById('apiInfo');
        apiInfo.style.color = "#11A655";
        apiInfo.innerText = "Image successfully saved. Go to your Cloud Storage to view.";
    }

    const b64 = api_json.b64;
    const date = api_json.date;
    const oid = api_json.oid;

    return [{b64, date, oid}];
}

