
let lat, lon;
let api = "https://maps.googleapis.com/maps/api/streetview?";
let size = "size=400x400";
let fov = "&fov=40";
let heading = "&heading=";
let pitch = "&pitch=90";
let apiKey = "";

let img;
let locations = [];
let moods = ["safer", "calmer", "less anxious", "happier", "acknowledged", "affirmed", 
            "carefree", "easier", "less troubled", "undisturbed", "supported"];

document.getElementById('geolocate').addEventListener('click', event => {
    if ('geolocation'in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition( async position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            // document.getElementById('latitude').textContent = lat;
            // document.getElementById('longitude').textContent = lon;
            // console.log(position);
            const data = {lat, lon};
            const options = {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            // fetch('/api', options).then(response => {
            //     console.log(response);
            // });
            const response = await fetch('api', options);
            const json = await response.json();
            let key = json.api;
            apiKey = `&key=${key}`;
            img = document.getElementById('img');
            img.src = getUrl();
            // await showImage();
            img.onload = () => console.log('loaded');
            console.log(json);
        });
    } else {
        console.log('geolocation not available');
    }
});

function getUrl() {
    let loc = `&location=${lat},${lon}`;
    let url = api + size + loc + fov + heading + pitch + apiKey;
    return url;
}

async function showImage() {
    img.src = getUrl();
}