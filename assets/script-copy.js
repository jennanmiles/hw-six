// click function
$('#search').click(function() {
    let userCity = $('#searchField').val();

    // sidebar inputs user text, queries api, and adds div to search sidebar
    $('.recentSearch').append('<div class="textlabel">' + userCity +'</div>');

    // stores to local storage
    let searches = localStorage.setItem('input', JSON.stringify(userCity));
    $('.textlabel').text(searches);
    
    //let pastsearches = localStorage.getItem('input');

    // clear user input on click --> make clickable 
    $('.forecastCardWrapper').empty();
    // current city div displays temp, humidity, wind speed, and UV index
    let queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + userCity +'&APPID=0a2917cfe155f518d8a07dd10675329a&units=imperial';

    // console.log(lat);
    // console.log(lon);

// ajax call with promise    
    $.ajax({
        url: queryUrl,
        method: 'GET',
    }).then(function(response) {
        console.log(response);
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
        //console.log(arraylen);
        // getting 5 day forecast
        let newArray = arraylen.slice(0,5);
        //console.log(newArray);

        for (let i = 0; i < newArray.length; i++) {
            let card = $('<div>').addClass('forecastCard');
            let temp = $('<div>').addClass('temp').text('Temperature: ' + newArray[i].main.temp + '°F');
            let humid = $('<div>').addClass('humidity').text('Humidity: ' + newArray[i].main.humidity + '%');

            card.append(temp,humid);
            $('.forecastCardWrapper').append(card);
        }

    })

// close click function
})

function getLatLon (lat,lon) {
    // uv index query, date query
    let queryUrl2 = 'https://api.openweathermap.org/data/2.5/uvi?appid=0a2917cfe155f518d8a07dd10675329a&lat=' + lat + '&lon=' + lon;

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
}