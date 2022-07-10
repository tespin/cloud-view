window.addEventListener('load', (event) => {
    fetchImages().then( () => {
         // console.log("gallery loaded");
        let imgs = document.querySelectorAll("div#gallery img");
        imgs.forEach(img => {
            // img.remove();
            let showBorder;
            img.addEventListener('click', event => {
                showBorder != showBorder;
                console.log(showBorder);
                let selected = event.target;
                if (showBorder) {
                    selected.style.border = "2px solid red";
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

        entryDiv.append(img);
        gallery.append(entryDiv);
    });
}