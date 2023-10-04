const apiKey = "831ec6a48d0f49b1b7a155036231909";
const apiURL = "https://api.weatherapi.com/v1";

const searchBox = document.getElementById('searchText');
const btnSearch = document.getElementById('btnSearch');
const alertWrongName = document.getElementById('alertWrongName');
const alertWrongNavigation = document.getElementById('alertWrongNavigation');
const localtime = document.getElementById('localTime');

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
            
            for (let index = 0, day = 1; index < data.forecast.forecastday.length; index++, day++) {
                document.getElementById(`forecastDay${day}`).innerHTML = data.forecast.forecastday[index].date;
                document.getElementById(`sunriseTimeForecastD${day}`).innerHTML = data.forecast.forecastday[index].astro.sunrise;
                document.getElementById(`maxTempForecastD${day}`).innerHTML = data.forecast.forecastday[index].day.maxtemp_c+"°C";
                document.getElementById(`minTempForecastD${day}`).innerHTML = data.forecast.forecastday[index].day.mintemp_c+"°C";
                document.getElementById(`avgHumidityForecastD${day}`).innerHTML = data.forecast.forecastday[index].day.avghumidity+"%";
                document.getElementById(`conditionValueForecastD${day}`).innerHTML = data.forecast.forecastday[index].day.condition.text;
                document.getElementById(`conditionImageForecastD${day}`).src = data.forecast.forecastday[index].day.condition.icon;
            }
        }
        //set past weather
        const currentDate = new Date();

        const end_date = currentDate.toISOString().slice(0,10);
        currentDate.setDate(currentDate.getDate() -7);

        const start_date = currentDate.toISOString().slice(0,10);
        
        const responsePast = await fetch(apiURL+`/history.json?key=${apiKey}&q=${latitude},${longitude}&dt=${start_date}&end_dt=${end_date}`);
        
        if(responsePast.status == 400){
            alertWrongNavigation.style.display = "block";
        }else{
            alertWrongNavigation.style.display = "none";
            var data = await responsePast.json();
            console.log(data);

            pastDay1.innerHTML = data.forecast.forecastday[6].date;
            sunriseTimePastD1.innerHTML = data.forecast.forecastday[6].astro.sunrise;
            maxTempPastD1.innerHTML = data.forecast.forecastday[6].day.maxtemp_c+"°C";
            minTempPastD1.innerHTML = data.forecast.forecastday[6].day.mintemp_c+"°C";
            avgHumidityPastD1.innerHTML = data.forecast.forecastday[6].day.avghumidity+"%";
            conditionValuePastD1.innerHTML = data.forecast.forecastday[6].day.condition.text;
            conditionImagePastD1.src = data.forecast.forecastday[6].day.condition.icon;

            for (let index = 0 , day = 2 ; index < data.forecast.forecastday.length-2; index++ , day++) {
                document.getElementById(`pastDay${day}`).innerHTML = data.forecast.forecastday[index].date;
                document.getElementById(`sunriseTimePastD${day}`).innerHTML = data.forecast.forecastday[index].astro.sunrise;
                document.getElementById(`maxTempPastD${day}`).innerHTML = data.forecast.forecastday[index].day.maxtemp_c+"°C";
                document.getElementById(`minTempPastD${day}`).innerHTML = data.forecast.forecastday[index].day.mintemp_c+"°C";
                document.getElementById(`avgHumidityPastD${day}`).innerHTML = data.forecast.forecastday[index].day.avghumidity+"%";
                document.getElementById(`conditionValuePastD${day}`).innerHTML = data.forecast.forecastday[index].day.condition.text;
                document.getElementById(`conditionImagePastD${day}`).src = data.forecast.forecastday[index].day.condition.icon;
            }
        }
        //set default hour by hour
        const start_date2 = currentDate.getDate();
        const start_month2 = currentDate.getMonth() +1;
        const start_year2 = currentDate.getFullYear();
        
        const end_date2 = currentDate.getDate() +1;
        const end_month2 = currentDate.getMonth() +1;
        const end_year2 = currentDate.getFullYear();
        
        const response = await fetch(apiURL + `/history.json?key=${apiKey}&q=${latitude},${longitude}&dt=${start_year2}-${start_month2}-${start_date2}&dt_end=${end_year2}-${end_month2}-${end_date2}`);
        var data = await response.json();
        
        console.log(data);
        for (let index = 0; index < 8; index++) {
            document.getElementById(`morningImage${index+1}`).src = data.forecast.forecastday[0].hour[index].condition.icon;
            document.getElementById(`morningTime${index+1}`).innerHTML = data.forecast.forecastday[0].hour[index].time;
            document.getElementById(`morningTemp${index+1}`).innerHTML = data.forecast.forecastday[0].hour[index].temp_c+"°C";
        }
        for (let index = 0, hour = 8; index < 8 || hour <16; index++, hour++) {
            document.getElementById(`afternoonImage${index+1}`).src = data.forecast.forecastday[0].hour[hour].condition.icon;
            document.getElementById(`afternoonTime${index+1}`).innerHTML = data.forecast.forecastday[0].hour[hour].time;
            document.getElementById(`afternoonTemp${index+1}`).innerHTML = data.forecast.forecastday[0].hour[hour].temp_c+"°C";
        }
        for (let index = 0, hour = 16; index < 8 || hour <24; index++, hour++) {
            document.getElementById(`eveningImage${index+1}`).src = data.forecast.forecastday[0].hour[hour].condition.icon;
            document.getElementById(`eveningTime${index+1}`).innerHTML = data.forecast.forecastday[0].hour[hour].time;
            document.getElementById(`eveningTemp${index+1}`).innerHTML = data.forecast.forecastday[0].hour[hour].temp_c+"°C";
        }
    }
)

//search button event listener
btnSearch.addEventListener('click', e=>{
    e.preventDefault();

    currentWeather();
    currentWeatherByHours();
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
//set hour by hour
async function currentWeatherByHours(){
    const currentDate = new Date();

    const start_date = currentDate.getDate();
    const start_month = currentDate.getMonth() +1;
    const start_year = currentDate.getFullYear();

    const end_date = currentDate.getDate() +1;
    const end_month = currentDate.getMonth() +1;
    const end_year = currentDate.getFullYear();

    const response = await fetch(apiURL + `/history.json?key=${apiKey}&q=${searchBox.value}&dt=${start_year}-${start_month}-${start_date}&dt_end=${end_year}-${end_month}-${end_date}`);
    var data = await response.json();

    console.log(data);
    for (let index = 0; index < 16; index++) {
        document.getElementById(`morningImage${index+1}`).src = data.forecast.forecastday[0].hour[index].condition.icon;
        document.getElementById(`morningTime${index+1}`).innerHTML = data.forecast.forecastday[0].hour[index].time;
        document.getElementById(`morningTemp${index+1}`).innerHTML = data.forecast.forecastday[0].hour[index].temp_c+"°C";
    }
    for (let index = 0, hour = 8; index < 8 || hour <16; index++, hour++) {
        document.getElementById(`afternoonImage${index+1}`).src = data.forecast.forecastday[0].hour[hour].condition.icon;
        document.getElementById(`afternoonTime${index+1}`).innerHTML = data.forecast.forecastday[0].hour[hour].time;
        document.getElementById(`afternoonTemp${index+1}`).innerHTML = data.forecast.forecastday[0].hour[hour].temp_c+"°C";
    }
    for (let index = 0, hour = 16; index < 8 || hour <24; index++, hour++) {
        document.getElementById(`eveningImage${index+1}`).src = data.forecast.forecastday[0].hour[hour].condition.icon;
        document.getElementById(`eveningTime${index+1}`).innerHTML = data.forecast.forecastday[0].hour[hour].time;
        document.getElementById(`eveningTemp${index+1}`).innerHTML = data.forecast.forecastday[0].hour[hour].temp_c+"°C";
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

    const end_date = currentDate.toISOString().slice(0,10);
    currentDate.setDate(currentDate.getDate() -7);

    const start_date = currentDate.toISOString().slice(0,10);
        
    const responsePast = await fetch(apiURL+`/history.json?key=${apiKey}&q=${latitude},${longitude}&dt=${start_date}&end_dt=${end_date}`);
        
    if(responsePast.status == 400){
        alertWrongNavigation.style.display = "block";
    }else{
        alertWrongNavigation.style.display = "none";
        var data = await responsePast.json();
        console.log(data);

        pastDay1.innerHTML = data.forecast.forecastday[6].date;
        sunriseTimePastD1.innerHTML = data.forecast.forecastday[6].astro.sunrise;
        maxTempPastD1.innerHTML = data.forecast.forecastday[6].day.maxtemp_c+"°C";
        minTempPastD1.innerHTML = data.forecast.forecastday[6].day.mintemp_c+"°C";
        avgHumidityPastD1.innerHTML = data.forecast.forecastday[6].day.avghumidity+"%";
        conditionValuePastD1.innerHTML = data.forecast.forecastday[6].day.condition.text;
        conditionImagePastD1.src = data.forecast.forecastday[6].day.condition.icon;

        for (let index = 0 , day = 2 ; index < data.forecast.forecastday.length-2; index++ , day++) {
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

//set time
function realtimeClock(){
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var ampm = (hours < 12) ? "AM" : "PM";

    hours = (hours > 12) ? hours - 12 : hours;

    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);

    localtime.innerHTML = hours + ":" + minutes + ":" + seconds + " " +ampm;

    var timeOut = setTimeout(realtimeClock, 500);
}

realtimeClock();

//set dark mode
const body = document.body;
const btnThemeLight = document.getElementById('theme-btn-light');
const btnThemeDark = document.getElementById('theme-btn-dark');

btnThemeLight.addEventListener('click', ()=>{
    body.classList.remove('background-dark');
    body.classList.add('background-light');
    localtime.classList.add('localTime-dark');
})
btnThemeDark.addEventListener('click', ()=>{
    body.classList.remove('background-light');
    body.classList.add('background-dark');
    localtime.classList.remove('localTime-dark');
})

