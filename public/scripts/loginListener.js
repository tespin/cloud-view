const form = document.getElementById('submit');
form.addEventListener('submit', event => {
    const data = new FormData(form);
    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/jason'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('signup', options);
    const json = await response.json();
    console.log(json);
})

// const data = {selected};
//     const options = {
//         method: 'POST', headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     };
//     const response = await fetch('delete', options);
//     const json = await response.json();

//     window.location = json.redirect;