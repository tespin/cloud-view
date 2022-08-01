const api = "https://maps.googleapis.com/maps/api/streetview";
const fov = "&fov=40";
const heading = "&heading=";
const pitch = "&pitch=90";
let base64 = "";

document.getElementById('geolocate').addEventListener('click', event => {
    const apiError = document.getElementById('apiError');

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const location_data = {lat, lon};
            const options = {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(location_data)
            };

            const api_response = await fetch('api', options);
            const api_json = await api_response.json();
            const api_key = `&key=${api_json.api}`;

            const meta_response = await fetch(checkMetadata(api, location_data, api_key));
            const meta_json = await meta_response.json();

            console.log(meta_json.status);

        })
    } else {
        apiError.style.display = "block";
        apiError.innerText = "Please give the browser permission to use your location.";
    }
})

function checkMetadata(api, loc, key) {
    const meta_url = `${api}/metadata?location=${loc.lat},${loc.lon}&key=${key}`;
    console.log(meta_url);
    return meta_url;
}