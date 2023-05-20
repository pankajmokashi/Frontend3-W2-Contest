function displayError(error){
    const sec3 = document.getElementById("sec3")
    sec3.innerHTML = `<div id="error">${error}</div>`
}

function displayLocation(result, id) {
    const currentLocation = document.getElementById(id)
    let postcode = []
    if('postcode' in result){
        postcode = result.postcode.split(",")
    }
    else{
        postcode = '-'
    }

    currentLocation.innerHTML = ""
    currentLocation.innerHTML =
        `
            <div>Name Of Time Zone : <b>${result.timezone.name}</b></div>
            <div class="lat-long">
                <div>Lat: <b>${result.lat}</b></div>
                <div>Long: <b>${result.lon}</b></div>
            </div>
            <div>Offset STD: <b>${result.timezone.offset_STD}</b></div>
            <div>Offset STD Seconds : <b>${result.timezone.offset_STD_seconds}</b></div>
            <div>Offset DST : <b>${result.timezone.offset_DST}</b></div>
            <div>Offset DST Seconds: <b>${result.timezone.offset_DST_seconds}</b></div>
            <div>Country: <b>${result.country}</b></div>
            <div>Postcode: <b>${postcode[0]}</b></div>
            <div>City: <b>${result.city}</b></div>
            `
}

function displayByAddress(event, key) {
    const input = document.getElementById("input")
    const address = input.value
    const sec3 = document.getElementById("sec3")
    sec3.innerHTML = ""
    if (address === "") {
        sec3.innerHTML = `<div id="error">Please Enter an Address!</div>`
        let error = "Please Enter Address"
        displayError(error)

    }
    else {
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${key}`)
            .then(resp => resp.json())
            .then((geocodingResult) => {
                if(geocodingResult.features.length === 0){
                    let error = "Please Enter valid Address"
                    displayError(error)
                }
                else{
                    sec3.innerHTML = 
                    `
                        <div class="text">Your Result</div>
                        <div id="address" class="display"></div>
                    `
                    let id = "address"
                    displayLocation(geocodingResult.features[0].properties, id)
                }
            });
    }
}

async function getLocation(coord) {
    let lat = coord.lat
    let long = coord.long
    let key = '5247c793129742758036fda922c267c4'
    let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=${key}`


    function data() {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    console.error(error);
                });
        });
    }
    let result = await data()
    let id = "current"
    displayLocation(result.results[0], id)
    return key
}

window.onload = async () => {

    const getCoords = async () => {
        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        return {
            long: pos.coords.longitude,
            lat: pos.coords.latitude,
        };
    };

    const coords = await getCoords();

    let key = await getLocation(coords)

    const button = document.getElementById("submit")
    button.addEventListener("click", () => {
        displayByAddress(event, key)
    })
}
