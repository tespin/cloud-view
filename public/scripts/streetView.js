
let lat, lon;
let api = "https://maps.googleapis.com/maps/api/streetview";
let fov = "&fov=40";
let heading = "&heading=";
let pitch = "&pitch=90";
let apiKey = "";
let base64 = "";

document.getElementById('geolocate').addEventListener('click', event => {

    if ('geolocation'in navigator) {
        // console.log('geolocation available');
        navigator.geolocation.getCurrentPosition( async position => {
            let apiErrorBox = document.getElementById('apiErrorBox');
            apiErrorBox.style.display = "block";
            apiErrorBox.innerText = "Acquiring image ..."

            // test for ZERO_RESULTS in api
            // lat = 78.648401; 
            // lon = 14.194336;

            lat = position.coords.latitude;
            lon = position.coords.longitude;
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
            const key = json.api;
            apiKey = `&key=${key}`;

            const meta = await fetch(checkMetadata());
            const metajson = await meta.json();

            if (metajson.status == "ZERO_RESULTS") {
                apiErrorBox.style.display = "block";
                apiErrorBox.innerText = "Street View API could not find an image near your location.";
                return console.log(metajson.status);
            }

            let img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = getUrl();
            img.id = "result";

            img.onload = () => {
                apiErrorBox.style.display = "none";
                img.alt = "Street view image of the sky above current location";
                // console.log("loaded");
                const responseDiv = document.getElementById("response");
                responseDiv.classList.toggle("valid");
                responseDiv.style.display = "block";
                responseDiv.append(img);
                // let canvas = document.createElement("canvas");
                // canvas.width = img.width;
                // canvas.height = img.height;
                // let context = canvas.getContext("2d");
                // context.drawImage(img, 0, 0);
                // let imgContainer = document.getElementsByClassName("response")[0];
                // let imgContainer = document.getElementById("response");
                // imgContainer.style.display = "block";
            }
            // const meta = await checkMetadata();
            // console.log(checkMetadata());
            // try {
            //     const meta = await fetch(checkMetadata());
            //     const metajson = await meta.json();
            // } catch (error) {
            //     console.log(error);
            // }
            // console.log(metajson.status);

            // if (metajson)
            // console.log(meta);

            // let img = document.getElementById("result");
            // img.crossOrigin = "Anonymous";
            // img.src = getUrl();
            // img.onload = () => {
            //     img.alt = "Street view image of the sky above current location";
            //     // console.log("loaded");
            //     let responseContainer = document.getElementById("response");
            //     responseContainer.style.display = "block";
            //     // let canvas = document.createElement("canvas");
            //     // canvas.width = img.width;
            //     // canvas.height = img.height;
            //     // let context = canvas.getContext("2d");
            //     // context.drawImage(img, 0, 0);
            //     // let imgContainer = document.getElementsByClassName("response")[0];
            //     // let imgContainer = document.getElementById("response");
            //     // imgContainer.style.display = "block";
            // }
        });
    } else {
        console.log('geolocation not available');
    }
});

function checkMetadata() {
    let loc = `?location=${lat},${lon}`;
    let res = `${api}/metadata${loc}${apiKey}`;

    return res;
}

function getUrl() {
    let parentDiv = document.getElementsByClassName("container")[0];
    let size = `size=${parentDiv.offsetWidth}x${parentDiv.offsetWidth}`;
    let loc = `&location=${lat},${lon}`;
    // let url = api + size + loc + fov + heading + pitch + apiKey;
    let url =`${api}?${size}${loc}${fov}${heading}${pitch}${apiKey}`;
    return url;
}