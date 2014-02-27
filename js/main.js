var interval;

getWeather("./weather.php");

function getWeather(link) {
	$.getJSON(link, function(data) {

		//set weather id & icon 
		var id = data.weather[0].id;
		var icon = data.weather[0].icon;

		$('#weather-id').text(id);
		$('#weather-icon').text(icon);

		//change such doge and sky based on much icon
		var doge_img = "url(./img/doge/" + icon + ".png)";
		$('.doge-image').css('background-image', doge_img);

		var sky_img = "url(./img/sky-img/" + icon + ".png)";
		$('.bg').css('background-image', sky_img);

		//get weather description
		var tempCelcius = data.main.temp - 273.15;
		var tempFahrenheit = tempCelcius * 9 / 5 + 32;
		var description = data.weather[0].description;

		$('#weather-desc').text("wow " + description);
		$('#location').text(data.name);

		$('#degreesCelsius .number').text(Math.round(tempCelcius));
		$('#degreesCelsius .cel').text("°C ");
		$('#degreesFahrenheit').text(Math.round(tempFahrenheit) + "°F");

		$('.suchlikes').show();
		$('.ourinfo').show();

		//initialise such doge
		$($.doge);
	});
}

$('#browser_geo').on('click', function() {
	getLocation();

	function getLocation() {
		if( navigator.geolocation ) {
			navigator.geolocation.getCurrentPosition(showPosition);
		}
		else
			$("#browser_geo").text("Geolocation is not supported by this browser.");
	}

	function showPosition(position) {
		var url = 'http://api.openweathermap.org/data/2.5/weather';
		url += '?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&callback=?';

		clearInterval(interval);
		getWeather(url);
		$("#browser_geo").text("wow, located!").css("cursor", "auto").css("color", "#FF5CFF");
	}
});

$('form#postal_search').submit(function(event) {

	event.preventDefault();

	var postal_code = $('#postal_code_input').val();

	// Validate the zipcode as best we can
	// More specific validation found in 
	postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
	is_valid_zip = postalCodeRegex.test(postal_code);

	if( is_valid_zip ) {

		$.getJSON("./geocode.php?postal_code=" + postal_code, function(data) {

			if( data.status == "OK" ) {
				var url = 'http://api.openweathermap.org/data/2.5/weather';
				url += '?lat=' + data.results[0].geometry.location.lat;
				url += '&lon=' + data.results[0].geometry.location.lng + '&callback=?';

				clearInterval(interval);
				getWeather(url);
				$("#browser_geo").text("wow, located!").css("cursor", "auto").css("color", "#FF5CFF");
			}
			else {
				alert("Couldn't fetch your weather.  Much failure.");
			}

		});

		$('form#postal_search input[type=search]').val('');

	}
	else
		alert("Please enter a valid zip code");

});