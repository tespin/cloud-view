document.getElementById('geolocate').addEventListener('click', event => {
    const apiInfo = document.getElementById('apiInfo');

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

            const api = "https://maps.googleapis.com/maps/api/streetview";
            const api_response = await fetch('api', options);
            const api_json = await api_response.json();
            const api_key = api_json.api;

            const meta_response = await fetch(getMetadata(api, location_data, api_key));
            const meta_json = await meta_response.json();

            if (meta_json.status == "ZERO_RESULTS") {
                apiInfo.style.display = "block";
                apiInfo.innerText = "An image could not be found at your current coordinates. Please move to a new location and try again.";
            } else if (meta_json.status == "OK") {
                const result = document.getElementById('result');
                result.style.visibility = "hidden";

                const fov = 40;
                const heading = "";
                const pitch = 90;

                const responseDiv = document.getElementById('response');
                const w = responseDiv.offsetWidth;
                const h = responseDiv.offsetWidth;
                const size = {w, h};

                result.src = getUrl(api, size, location_data, fov, heading, pitch, api_key);
                result.onload = () => {
                    apiInfo.style.display = "none";
                    apiInfo.innerText = "";

                    result.style.visibility = "visible";

                    const saveButton = document.getElementById('save');
                    if (saveButton) {
                        saveButton.removeAttribute('disabled');
                    }
                }
            } else {
                apiInfo.style.display = "block";
                apiInfo.innerText = "The request could not be completed. Please try again another time.";
            }

        })
    } else {
        apiInfo.style.display = "block";
        apiInfo.innerText = "Please give the browser permission to use your location.";
    }
})

function getMetadata(api, loc, key) {
    const meta_url = `${api}/metadata?location=${loc.lat},${loc.lon}&key=${key}`;
    return meta_url;
}

function getUrl(api, size, loc, fov, heading, pitch, key) {
    const url = `${api}?size=${size.w}x${size.h}&location=${loc.lat},${loc.lon}&fov=${fov}&heading=${heading}&pitch=${pitch}&key=${key}`;
    console.log(url);
    return url;
}