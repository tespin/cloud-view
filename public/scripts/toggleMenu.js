const toggle_btn = document.querySelector('#menu-toggle');
const close_btn = document.getElementById('close-menu');
const menu = document.querySelector('div.menu');
toggle_btn.addEventListener('click', event => {
    toggle_btn.classList.toggle('menu-open');
    menu.classList.toggle('active');

    if (toggle_btn.classList.contains('menu-open')) {
        toggle_btn.innerHTML = 'x';
        toggle_btn.setAttribute('aria-expanded', true);
        toggle_btn.setAttribute('aria-label', 'Close menu');

    } else {
        toggle_btn.innerHTML = 'Menu';
        toggle_btn.setAttribute('aria-expanded', false);
        toggle_btn.setAttribute('aria-label', 'Open menu');
    }
})