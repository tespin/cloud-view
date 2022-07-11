document.getElementById('deleteAll').addEventListener('click', event => {
    // let gallery = document.getElementById('gallery');
    let imgs = document.querySelectorAll("div#gallery img")
    imgs.forEach(img => {
        img.remove();
    });
});

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