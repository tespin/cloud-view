document.getElementById('deleteAll').addEventListener('click', event => {
    // let gallery = document.getElementById('gallery');
    let imgs = document.querySelectorAll("div#gallery img")
    imgs.forEach(img => {
        img.remove();
    });
});