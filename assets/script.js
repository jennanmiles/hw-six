// pseudo code

// sidebar inputs user text, queries api, and adds div to search sidebar


// current city div displays temp, humidity, wind speed, and UV index
//let queryUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&APPID=0a2917cfe155f518d8a07dd10675329a';
let queryUrl = 'http://api.openweathermap.org/data/2.5/weather?q=tucson&APPID=0a2917cfe155f518d8a07dd10675329a&units=imperial';

$.ajax({
    url: queryUrl,
    method: 'GET',
}).then(function(response) {
    //console.log(response);
    // city name
    $('#cityName').html(response.name);
    // temp
    $('#cityTemp').html('Temperature: ' + response.main.temp + '°F');
    // humidity
    $('#cityHumidity').html('Humidity: ' + response.main.humidity + '%');
    // wind speed
    $('#cityWind').html('Wind Speed: ' + response.wind.speed + ' MPH');
    // uv index
    
});

// uv index query, date query
let queryUrl2 = 'http://api.openweathermap.org/data/2.5/uvi?appid=0a2917cfe155f518d8a07dd10675329a&lat=32.22&lon=-110.93'

$.ajax({
    url: queryUrl2,
    method: 'GET',
}).then(function(response) {
    //console.log(response);
    // date
    $('#cityDate').html('Date: ' + response.date_iso);
    // uv index
    $('#cityUV').html('UV Index: ' + response.value);
})

// 5 day forecast displays the date, the temp, the humidity, and an icon
let queryUrl3 = 'http://api.openweathermap.org/data/2.5/forecast?appid=0a2917cfe155f518d8a07dd10675329a&q=tucson&units=imperial'

$.ajax({
    url: queryUrl3,
    method: 'GET',
}).then(function(response) {
    let arraylen = response.list;
    // getting 5 day forecast
    let newArray = arraylen.slice(0,5);

    for (let i = 0; i < newArray.length; i++) {
        let temp = newArray[i].main.temp;
        console.log(temp);
        let card = $('.forecastCardWrapper').append('<div class="forecastCard"><div class="temp"></div></div>');
        $('.temp').html(temp);
    }
})