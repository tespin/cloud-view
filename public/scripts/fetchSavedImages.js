window.addEventListener('load', (event) => {
    fetchImages().then( (res) => {
         // console.log("gallery loaded");
        let imgs = document.querySelectorAll("div#gallery img");
        imgs.forEach(img => {
            // img.remove();
            // let showBorder = false;
            img.addEventListener('click', event => {
                // showBorder != showBorder;
                // console.log(showBorder);
                // console.log(savedImages.length);
                let selected = event.target;
                console.log(`Image ${img.dataset.index} selected`)
                if (selected.style.border == "") {
                    selected.style.border = "3px solid #005180";
                } else {
                    selected.style.border = "";
                }
            });
        });
    });
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
    let gallery = document.getElementById('gallery');

    savedImages.forEach(element => {
        let entryDiv = document.createElement('div');
        entryDiv.className = 'entry';

        let img = new Image();
        img.src = element;
        img.dataset.index = savedImages.length - 1;
        entryDiv.append(img);
        gallery.append(entryDiv);
    });
}