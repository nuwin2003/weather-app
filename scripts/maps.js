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

function success(pos){
    const lat = pos.coords.latitude;
    const lan = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    L.marker([lat, lan]).addTo(map);
    L.circle([lat, lan], {radius : accuracy}).addTo(map);
}

function error(error){
    alert("please allow your location address");
}

//set location for the searched location
btnSearch.addEventListener('click',e=>{
    
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

        const lat = data.location.lat;
        const lan = data.location.lon;

        L.marker([lat, lan]).addTo(map);
        map.setView([lat,lan],10);
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
