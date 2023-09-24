const apiKey = "831ec6a48d0f49b1b7a155036231909";
const apiURL = "http://api.weatherapi.com/v1";

const searchBox = document.getElementById('searchText');
const btnSearch = document.getElementById('btnSearch');
const alertWrongName = document.getElementById('alertWrongName');
const alertWrongNavigation = document.getElementById('alertWrongNavigation');

const locationOnNavbar = document.getElementById('locationOnNavbar');
const currentWeatherImg = document.getElementById('currentWeatherImg');
const currentTemp = document.getElementById('currentTemp');
const currentLocation = document.getElementById('currentLocation');
const currentCondition = document.getElementById('currentCondition');
const currentHumidity = document.getElementById('currentHumidity');
const currentWindSpeed = document.getElementById('currentWindSpeed');

//set default location
navigator.geolocation.getCurrentPosition(
    async function(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        //set current weather
        const responseCurrent = await fetch(apiURL + `/current.json?key=${apiKey}&q=${latitude},${longitude}`);
        if(responseCurrent.status == 400){
            alertWrongNavigation.style.display = "block";
        }else{
            alertWrongNavigation.style.display = "none";
            var data = await responseCurrent.json();
            console.log(data);
            locationOnNavbar.innerHTML = data.location.name+", "+data.location.region+", "+data.location.country+".";
            currentWeatherImg.src = data.current.condition.icon;
            currentLocation.innerHTML = data.location.name;
            currentTemp.innerHTML = data.current.temp_c+"°C";
            currentCondition.innerHTML = data.current.condition.text;
            currentHumidity.innerHTML = data.current.humidity+"%";
            currentWindSpeed.innerHTML = data.current.wind_kph+" km/h";
        }
        //set forecast weather
        const responseForecast = await fetch(apiURL + `/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=4`);
        if(responseForecast.status == 400){
            alertWrongNavigation.style.display = "block";
        }else{
            alertWrongNavigation.style.display = "none";
            var data = await responseForecast.json();
            console.log(data);
            
            for (let index = 1; index < data.forecast.forecastday.length; index++) {
                document.getElementById(`forecastDay${index}`).innerHTML = data.forecast.forecastday[index].date;
                document.getElementById(`sunriseTimeForecastD${index}`).innerHTML = data.forecast.forecastday[index].astro.sunrise;
                document.getElementById(`maxTempForecastD${index}`).innerHTML = data.forecast.forecastday[index].day.maxtemp_c+"°C";
                document.getElementById(`minTempForecastD${index}`).innerHTML = data.forecast.forecastday[index].day.mintemp_c+"°C";
                document.getElementById(`avgHumidityForecastD${index}`).innerHTML = data.forecast.forecastday[index].day.avghumidity+"%";
                document.getElementById(`conditionValueForecastD${index}`).innerHTML = data.forecast.forecastday[index].day.condition.text;
                document.getElementById(`conditionImageForecastD${index}`).src = data.forecast.forecastday[index].day.condition.icon;
            }
        }
        //set past weather
        const currentDate = new Date();

        const end_date = currentDate.getDate()-1;
        const end_month = currentDate.getMonth() +1;
        const end_year = currentDate.getFullYear();

        const start_date = currentDate.getDate()-7;
        const start_month = currentDate.getMonth() +1;
        const start_year = currentDate.getFullYear();

        const response = await fetch(apiURL+`/history.json?key=${apiKey}&q=${latitude},${longitude}&dt=${start_year}-${start_month}-${start_date}&end_dt=${end_year}-${end_month}-${end_date}`);
        
        if(response.status == 400){
            alertWrongNavigation.style.display = "block";
        }else{
            alertWrongNavigation.style.display = "none";
            var data = await response.json();
            console.log(data);

            pastDay1.innerHTML = data.forecast.forecastday[6].date;
            sunriseTimePastD1.innerHTML = data.forecast.forecastday[6].astro.sunrise;
            maxTempPastD1.innerHTML = data.forecast.forecastday[6].day.maxtemp_c+"°C";
            minTempPastD1.innerHTML = data.forecast.forecastday[6].day.mintemp_c+"°C";
            avgHumidityPastD1.innerHTML = data.forecast.forecastday[6].day.avghumidity+"%";
            conditionValuePastD1.innerHTML = data.forecast.forecastday[6].day.condition.text;
            conditionImagePastD1.src = data.forecast.forecastday[6].day.condition.icon;

            for (let index = 0 , day = 2 ; index < data.forecast.forecastday.length-1; index++ , day++) {
                document.getElementById(`pastDay${day}`).innerHTML = data.forecast.forecastday[index].date;
                document.getElementById(`sunriseTimePastD${day}`).innerHTML = data.forecast.forecastday[index].astro.sunrise;
                document.getElementById(`maxTempPastD${day}`).innerHTML = data.forecast.forecastday[index].day.maxtemp_c+"°C";
                document.getElementById(`minTempPastD${day}`).innerHTML = data.forecast.forecastday[index].day.mintemp_c+"°C";
                document.getElementById(`avgHumidityPastD${day}`).innerHTML = data.forecast.forecastday[index].day.avghumidity+"%";
                document.getElementById(`conditionValuePastD${day}`).innerHTML = data.forecast.forecastday[index].day.condition.text;
                document.getElementById(`conditionImagePastD${day}`).src = data.forecast.forecastday[index].day.condition.icon;
            }
        }
    }
)

//search button event listener
btnSearch.addEventListener('click', e=>{
    e.preventDefault();

    currentWeather();
    forecastWeather();
    pastWeather();

    searchBox.value = "";
});

//set current weather
async function currentWeather(){
    const response = await fetch(apiURL + `/current.json?key=${apiKey}&q=${searchBox.value}`);
    if(response.status == 400){
        alertWrongName.style.display = "block";
    }else{
        alertWrongName.style.display = "none";
        var data = await response.json();
        console.log(data);

        locationOnNavbar.innerHTML = data.location.name+", "+data.location.region+", "+data.location.country+".";
        currentWeatherImg.src = data.current.condition.icon;
        currentLocation.innerHTML = data.location.name;
        currentTemp.innerHTML = data.current.temp_c+"°C";
        currentCondition.innerHTML = data.current.condition.text;
        currentHumidity.innerHTML = data.current.humidity+"%";
        currentWindSpeed.innerHTML = data.current.wind_kph+" km/h";
    }
}
//set forecast weather
async function forecastWeather(){
    const response = await fetch(apiURL + `/forecast.json?key=${apiKey}&q=${searchBox.value}&days=4`);
    if(response.status == 400){
        alertWrongName.style.display = "block";
    }else{
        alertWrongName.style.display = "none";
        var data = await response.json();
        console.log(data);
        
        for (let index = 1; index < data.forecast.forecastday.length; index++) {
            document.getElementById(`forecastDay${index}`).innerHTML = data.forecast.forecastday[index].date;
            document.getElementById(`sunriseTimeForecastD${index}`).innerHTML = data.forecast.forecastday[index].astro.sunrise;
            document.getElementById(`maxTempForecastD${index}`).innerHTML = data.forecast.forecastday[index].day.maxtemp_c+"°C";
            document.getElementById(`minTempForecastD${index}`).innerHTML = data.forecast.forecastday[index].day.mintemp_c+"°C";
            document.getElementById(`avgHumidityForecastD${index}`).innerHTML = data.forecast.forecastday[index].day.avghumidity+"%";
            document.getElementById(`conditionValueForecastD${index}`).innerHTML = data.forecast.forecastday[index].day.condition.text;
            document.getElementById(`conditionImageForecastD${index}`).src = data.forecast.forecastday[index].day.condition.icon;
        }
    }
}
//set past weather
async function pastWeather(){
    const currentDate = new Date();

    const end_date = currentDate.getDate()-1;
    const end_month = currentDate.getMonth() +1;
    const end_year = currentDate.getFullYear();

    const start_date = currentDate.getDate()-7;
    const start_month = currentDate.getMonth() +1;
    const start_year = currentDate.getFullYear();

    const response = await fetch(apiURL+`/history.json?key=${apiKey}&q=${searchBox.value}&dt=${start_year}-${start_month}-${start_date}&end_dt=${end_year}-${end_month}-${end_date}`);
    
    if(response.status == 400){
        alertWrongName.style.display = "block";
    }else{
        alertWrongName.style.display = "none";
        var data = await response.json();
        console.log(data);

        pastDay1.innerHTML = data.forecast.forecastday[6].date;
        sunriseTimePastD1.innerHTML = data.forecast.forecastday[6].astro.sunrise;
        maxTempPastD1.innerHTML = data.forecast.forecastday[6].day.maxtemp_c+"°C";
        minTempPastD1.innerHTML = data.forecast.forecastday[6].day.mintemp_c+"°C";
        avgHumidityPastD1.innerHTML = data.forecast.forecastday[6].day.avghumidity+"%";
        conditionValuePastD1.innerHTML = data.forecast.forecastday[6].day.condition.text;
        conditionImagePastD1.src = data.forecast.forecastday[6].day.condition.icon;

        for (let index = 0 , day = 2 ; index < data.forecast.forecastday.length-1; index++ , day++) {
            document.getElementById(`pastDay${day}`).innerHTML = data.forecast.forecastday[index].date;
            document.getElementById(`sunriseTimePastD${day}`).innerHTML = data.forecast.forecastday[index].astro.sunrise;
            document.getElementById(`maxTempPastD${day}`).innerHTML = data.forecast.forecastday[index].day.maxtemp_c+"°C";
            document.getElementById(`minTempPastD${day}`).innerHTML = data.forecast.forecastday[index].day.mintemp_c+"°C";
            document.getElementById(`avgHumidityPastD${day}`).innerHTML = data.forecast.forecastday[index].day.avghumidity+"%";
            document.getElementById(`conditionValuePastD${day}`).innerHTML = data.forecast.forecastday[index].day.condition.text;
            document.getElementById(`conditionImagePastD${day}`).src = data.forecast.forecastday[index].day.condition.icon;
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const themeSwitch = document.getElementById('flexSwitchCheckDefault');
    const body = document.body;
    const darkModeLabel = document.getElementById('darkModeLabel');
    const navLink = document.getElementById('nav-link');

    themeSwitch.addEventListener('change',e=>{
        if(themeSwitch.checked){
            body.classList.add('theme-dark');
            darkModeLabel.classList.add('labelDarkMode');
        }else{
            body.classList.remove("theme-dark");
            darkModeLabel.classList.remove('labelDarkMode');
        }
    });
});