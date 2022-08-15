const toggle_btn = document.querySelector('#menu-toggle');
const menu = document.querySelector('nav');
toggle_btn.addEventListener('click', event => {
    toggle_btn.classList.toggle('button-open');
    menu.classList.toggle('active');
})