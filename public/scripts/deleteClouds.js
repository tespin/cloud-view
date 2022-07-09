document.getElementById('deleteAll').addEventListener('click', event => {
    // let gallery = document.getElementById('gallery');
    let imgs = gallery.querySelectorAll("div#gallery img")
    imgs.forEach(img => {
        img.remove();
    });
});