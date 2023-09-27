const apiKey = "831ec6a48d0f49b1b7a155036231909";
const apiURL = "https://api.weatherapi.com/v1";

const searchBox = document.getElementById('searchText');
const btnSearch = document.getElementById('btnSearch');

const alertWrongName = document.getElementById('alertWrongName');
const alertWrongNavigation = document.getElementById('alertWrongNavigation');
const locationOnNavbar = document.getElementById('locationOnNavbar');

var map = L.map('map').setView([7.8731, 80.7718], 8);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

navigator.geolocation.watchPosition(success , error);

let marker;
let circle;

function success(pos){
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    if(marker){
        map.removeLayer(marker);
        map.removeLayer(circle);
    }

    marker = L.marker([latitude, longitude]).addTo(map);
    circle = L.circle([latitude, longitude], {radius : accuracy}).addTo(map);

    map.fitBounds(circle.getBounds());

    map.setView([latitude,longitude]);
}
function error(error){
    alertWrongNavigation.style.display = "block";
}

//set location for the searched location
btnSearch.addEventListener('click', ()=>{
    
    searchedWeatherMap();

});

async function searchedWeatherMap(){
    const response = await fetch(apiURL + `/current.json?key=${apiKey}&q=${searchBox.value}`);
    if(response.status == 400){
        alertWrongName.style.display = "block";
    }else{
        alertWrongName.style.display = "none";
        var data = await response.json();
        console.log(data);

        locationOnNavbar.innerHTML = data.location.name+", "+data.location.region+", "+data.location.country+".";
        const latitude = data.location.lat;
        const longitude = data.location.lon;

        L.marker([latitude, longitude]).addTo(map);
        L.circle([latitude, longitude],5).addTo(map);
    }
}


//set dark mode
const body = document.body;
const btnThemeLight = document.getElementById('theme-btn-light');
const btnThemeDark = document.getElementById('theme-btn-dark');

btnThemeLight.addEventListener('click', ()=>{
    body.classList.remove('background-dark');
    body.classList.add('background-light');
})
btnThemeDark.addEventListener('click', ()=>{
    body.classList.remove('background-light');
    body.classList.add('background-dark');
})
