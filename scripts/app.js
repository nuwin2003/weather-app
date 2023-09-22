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

const forecastDay1 = document.getElementById('forecastDay1');
const sunriseTimeForecastD1 = document.getElementById('sunriseTimeForecastD1');
const maxTempForecastD1 = document.getElementById('maxTempForecastD1');
const minTempForecastD1 = document.getElementById('minTempForecastD1');
const avgHumidityForecastD1 = document.getElementById('avgHumidityForecastD1');
const conditionValueForecastD1 = document.getElementById('conditionValueForecastD1');
const conditionImageForecastD1 = document.getElementById('conditionImageForecastD1');

const forecastDay2 = document.getElementById('forecastDay2');
const sunriseTimeForecastD2 = document.getElementById('sunriseTimeForecastD2');
const maxTempForecastD2 = document.getElementById('maxTempForecastD2');
const minTempForecastD2 = document.getElementById('minTempForecastD2');
const avgHumidityForecastD2 = document.getElementById('avgHumidityForecastD2');
const conditionValueForecastD2 = document.getElementById('conditionValueForecastD2');
const conditionImageForecastD2 = document.getElementById('conditionImageForecastD2');

const forecastDay3 = document.getElementById('forecastDay3');
const sunriseTimeForecastD3 = document.getElementById('sunriseTimeForecastD3');
const maxTempForecastD3 = document.getElementById('maxTempForecastD3');
const minTempForecastD3 = document.getElementById('minTempForecastD3');
const avgHumidityForecastD3 = document.getElementById('avgHumidityForecastD3');
const conditionValueForecastD3 = document.getElementById('conditionValueForecastD3');
const conditionImageForecastD3 = document.getElementById('conditionImageForecastD3');

btnSearch.addEventListener('click', e=>{
    e.preventDefault();

    currentWeather();
    forecastWeather();

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

async function forecastWeather(){
    const response = await fetch(apiURL + `/forecast.json?key=${apiKey}&q=${searchBox.value}&days=5`);
    var data = await response.json();
    console.log(data);

    forecastDay1.innerHTML = data.forecast.forecastday[1].date;
    sunriseTimeForecastD1.innerHTML = data.forecast.forecastday[1].astro.sunrise;
    maxTempForecastD1.innerHTML = data.forecast.forecastday[1].day.maxtemp_c+"°C";
    minTempForecastD1.innerHTML = data.forecast.forecastday[1].day.mintemp_c+"°C";
    avgHumidityForecastD1.innerHTML = data.forecast.forecastday[1].day.avghumidity+"%";
    conditionValueForecastD1.innerHTML = data.forecast.forecastday[1].day.condition.text;
    conditionImageForecastD1.src = data.forecast.forecastday[1].day.condition.icon;

    forecastDay2.innerHTML = data.forecast.forecastday[2].date;
    sunriseTimeForecastD2.innerHTML = data.forecast.forecastday[2].astro.sunrise;
    maxTempForecastD2.innerHTML = data.forecast.forecastday[2].day.maxtemp_c+"°C";
    minTempForecastD2.innerHTML = data.forecast.forecastday[2].day.mintemp_c+"°C";
    avgHumidityForecastD2.innerHTML = data.forecast.forecastday[2].day.avghumidity+"%";
    conditionValueForecastD2.innerHTML = data.forecast.forecastday[2].day.condition.text;
    conditionImageForecastD2.src = data.forecast.forecastday[2].day.condition.icon;

    forecastDay3.innerHTML = data.forecast.forecastday[3].date;
    sunriseTimeForecastD3.innerHTML = data.forecast.forecastday[3].astro.sunrise;
    maxTempForecastD3.innerHTML = data.forecast.forecastday[3].day.maxtemp_c+"°C";
    minTempForecastD3.innerHTML = data.forecast.forecastday[3].day.mintemp_c+"°C";
    avgHumidityForecastD3.innerHTML = data.forecast.forecastday[3].day.avghumidity+"%";
    conditionValueForecastD3.innerHTML = data.forecast.forecastday[3].day.condition.text;
    conditionImageForecastD3.src = data.forecast.forecastday[3].day.condition.icon;
}