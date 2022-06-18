function time() {
	let now = new Date();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[now.getDay()];
	let firstDay = document.querySelector(".first-day");
	firstDay.innerHTML = day;
	let date = now.getDate();
	let firstDate = document.querySelector(".first-date");
	firstDate.innerHTML = date;
	if (date < 10) {
		let dateStr = `0${date}`;
		firstDate.innerHTML = dateStr;
	}
	let month = document.querySelector(".month");
	let currentMonth = now.getMonth() + 1;
	month.innerHTML = currentMonth;
	if (currentMonth < 10) {
		let currentMonthStr = `0${currentMonth}`;
		month.innerHTML = currentMonthStr;
	}
	let hour = document.querySelector("#hour");
	let currentHour = now.getHours();
	hour.innerHTML = currentHour;
	if (currentHour < 10) {
		let currentHourStr = `0${currentHour}`;
		hour.innerHTML = currentHourStr;
	}
	let minutes = document.querySelector("#minutes");
	let currentMinutes = now.getMinutes();
	minutes.innerHTML = currentMinutes;
	if (currentMinutes < 10) {
		currentMinutesStr = `0${currentMinutes}`;
		minutes.innerHTML = currentMinutesStr;
	}
}
function handleSubmit(event) {
	event.preventDefault();
	let city = document.querySelector("#search-city").value;
	if (city) {
		searchCityTemperature(city);
	} else {
		alert("Please, type the name of the city");
	}
}
function searchCityTemperature(city) {
	let apiKey = "a9c8a1ce0370b92d2bf8acab56c68686";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;

	axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
	console.log(response.data);
	let city = document.querySelector("h1");
	city.innerHTML = response.data.name;
	let currentTemperature = document.querySelector("#temperature");
	celsiusTemperature = Math.round(response.data.main.temp);
	currentTemperature.innerHTML = celsiusTemperature;
	let currentHumidity = document.querySelector("#humidity");
	currentHumidity.innerHTML = response.data.main.humidity;
	let windSpeed = document.querySelector("#wind");
	windSpeed.innerHTML = Math.round(response.data.wind.speed);
	let icon = document.querySelector("#icon");
	icon.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	icon.setAttribute("alt", response.data.weather[0].description);
	let description = document.querySelector("#description");
	description.innerHTML = response.data.weather[0].description;
}

function fahrenheitTemperature(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
	сelsius.classList.remove("active");
	fahrenheit.classList.add("active");
}

function сelsiusTemperature(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = celsiusTemperature;
	сelsius.classList.add("active");
	fahrenheit.classList.remove("active");
}
function showLocation(position) {
	let apiKey = "a9c8a1ce0370b92d2bf8acab56c68686";
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`;
	axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

time();

searchCityTemperature("London");

let searchForm = document.querySelector("form#search");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitTemperature);

let сelsius = document.querySelector("#сelsius");
сelsius.addEventListener("click", сelsiusTemperature);

let celsiusTemperature = null;
