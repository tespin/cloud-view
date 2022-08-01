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

            const api = "https://maps.googleapis.com/maps/api/streetview";
            const api_response = await fetch('api', options);
            const api_json = await api_response.json();
            const api_key = api_json.api;

            const meta_response = await fetch(getMetadata(api, location_data, api_key));
            const meta_json = await meta_response.json();

            if (meta_json.status == "ZERO_RESULTS") {
                apiError.style.display = "block";
                apiError.innerText = "An image could not be found at your current coordinates. Please move to a new location and try again.";
            } else if (meta_json.status == "OK") {
                const placeholder = document.getElementById('placeholder');
                placeholder.remove();

                const fov = 40;
                const heading = "";
                const pitch = 90;

                const responseDiv = document.getElementById('response');
                const w = responseDiv.offsetWidth;
                const h = responseDiv.offsetWidth;
                const size = {w, h};

                const img = new Image();
                img.crossOrigin = "Anonymous";
                img.id = "result";
                img.src = getUrl(api, size, location_data, fov, heading, pitch, api_key);
                img.onload = () => {
                    apiError.style.display = "none";
                    apiError.innerText = "";

                    img.alt = "Street view image of the sky above current location.";
                    responseDiv.append(img);
                }
            } else {
                apiError.style.display = "block";
                apiError.innerText = "The request could not be completed. Please try again another time.";
            }

        })
    } else {
        apiError.style.display = "block";
        apiError.innerText = "Please give the browser permission to use your location.";
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