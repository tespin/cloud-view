window.addEventListener('load', (event) => {
    fetchImages().then( () => {
         // console.log("gallery loaded");
        let imgs = document.querySelectorAll("div#gallery img");
        imgs.forEach(img => {
            // img.remove();
            img.addEventListener('click', event => {
                console.log("image clicked");
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

        entryDiv.append(img);
        gallery.append(entryDiv);
    });
}