const saveButton = document.getElementById('save');
saveButton.addEventListener('click', async (event) => {
    const img = document.getElementById('result');
    await (saveImage(img));
});

async function saveImage(image) {
    saveButton.classList.add('onhover');
    const btnDiv = document.getElementById('homeBtns');
    const apiInfo = document.createElement('div');
    apiInfo.id = 'apiInfo';
    apiInfo.classList.add('errorBox');
    apiInfo.innerText = 'Saving image ...';
    btnDiv.after(apiInfo);
    
    const img = document.getElementById('result');
    
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
    
    if (saved_json.status == "OK") {
        const all_imgs = document.querySelectorAll('.entry img');
        all_imgs.forEach(element => {
            if (selected.includes(element.dataset.id)) {
                const entry = element.closest('.entry');
                entry.remove();
            }
        })

        apiInfo.classList.add('success');
        apiInfo.innerText = "Image successfully saved. Go to your Cloud Storage to view.";
        saveButton.classList.remove('onhover');
    }

    // const b64 = api_json.b64;
    // const date = api_json.date;
    // const oid = api_json.oid;

    // return [{b64, date, oid}];
}

