const apiKey = "831ec6a48d0f49b1b7a155036231909";
const apiURL = "http://api.weatherapi.com/v1";

const searchBox = document.getElementById('searchText');
const btnSearch = document.getElementById('btnSearch');
const alertWrongName = document.getElementById('alertWrongName');
const locationOnNavbar = document.getElementById('locationOnNavbar');
const currentWeatherImg = document.getElementById('currentWeatherImg');
const currentTemp = document.getElementById('currentTemp');
const currentLocation = document.getElementById('currentLocation');
const currentCondition = document.getElementById('currentCondition');
const currentHumidity = document.getElementById('currentHumidity');
const currentWindSpeed = document.getElementById('currentWindSpeed');

btnSearch.addEventListener('click', e=>{
    e.preventDefault();

    currentWeather();


    console.log(searchBox.value);
    if(searchBox.value == "Colombo"){//condition needed
        alertWrongName.style.display = "block";
    }else{
        alertWrongName.style.display = "none";
    }

    searchBox.value = "";
});


async function currentWeather(){
    const response = await fetch(apiURL + `/current.json?key=${apiKey}&q=${searchBox.value}`);
    var data = await response.json();
    console.log(data);


    locationOnNavbar.innerText = data.location.name+", "+data.location.region+", "+data.location.country+".";
    currentWeatherImg.src = data.current.condition.icon;
    currentLocation.innerText = data.location.name;
    currentTemp.innerText = data.current.temp_c+"°C";
    currentCondition.innerHTML = data.current.condition.text;
    currentHumidity.innerHTML = data.current.humidity+"%";
    currentWindSpeed.innerHTML = data.current.wind_kph+" km/h";
}