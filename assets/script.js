// variables

// empty array
let itemsArray = localStorage.getItem('input') ? JSON.parse(localStorage.getItem('input')) : [];
// set array
let setArray = localStorage.setItem('input', JSON.stringify(itemsArray));
// parse array
let data = JSON.parse(localStorage.getItem('input'));


// onload function for refresh
$(document).ready(function(){
    loopArr();
    ajaxcalls(itemsArray[itemsArray.length-1]);
});

function loopArr() {
    // loop thru array 
    for (let i = 0; i < itemsArray.length; i++) {
        $('.recentSearch').append('<div class="textlabel">' + data[i] + '</div>');
    }
}


// click function
$('#search').click(function() {
    let userCity = $('#searchField').val();

    // appends input to search sidebar
    $('.recentSearch').append('<div class="textlabel">' + userCity +'</div>');

    // push to array
    itemsArray.push(userCity);
    // update local storage
    localStorage.setItem('input', JSON.stringify(itemsArray));
    // get last item in array

    // clear prior forecast on click 
    $('.forecastCardWrapper').empty();

    // ajax calls
    ajaxcalls(userCity);

});


function ajaxcalls (userCity) {

    // current day displays temp, humidity, wind speed, and UV index
    let queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + userCity +'&APPID=0a2917cfe155f518d8a07dd10675329a&units=imperial';

    // ajax call with promise    
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
        
        getLatLon(response.coord.lat, response.coord.lon);

    });

    // 5 day forecast displays the date, the temp, the humidity, and an icon
    let queryUrl3 = 'https://api.openweathermap.org/data/2.5/forecast?appid=0a2917cfe155f518d8a07dd10675329a&q=' + userCity + '&units=imperial'

    // another ajax call
    $.ajax({
        url: queryUrl3,
        method: 'GET',
    }).then(function(response) {
        let arraylen = response.list;
        // need every 2nd entry for 5 day
        let fiver = Math.floor(arraylen.length / 5);

        for (let i = 0; i < arraylen.length; i += fiver) {
            let card = $('<div>').addClass('forecastCard');
            // date
            let newdate = $('<div>').addClass('dateEntry').text('Date: ' + arraylen[i].dt_txt);
            // temp
            let temp = $('<div>').addClass('temp').text('Temperature: ' + arraylen[i].main.temp + '°F');
            // icons
            let icons = $('<div>').addClass('icon').html('<img src="http://openweathermap.org/img/wn/' + arraylen[i].weather[0].icon + '@2x.png">');
            // humidity
            let humid = $('<div>').addClass('humidity').text('Humidity: ' + arraylen[i].main.humidity + '%');
            // append
            card.append(newdate,temp,icons,humid);
            $('.forecastCardWrapper').append(card);
        }

    })

}

function getLatLon (lat,lon) {
    // uv index query, date query
    let queryUrl2 = 'https://api.openweathermap.org/data/2.5/uvi?appid=0a2917cfe155f518d8a07dd10675329a&lat=' + lat + '&lon=' + lon;

    $.ajax({
        url: queryUrl2,
        method: 'GET',
    }).then(function(response) {
        // date
        $('#cityDate').html('Date: ' + response.date_iso);
        // uv index
        $('#cityUV').html('UV Index: ' + response.value);
    })
}