function displayCurrentDate(timestamp) {
  let date = new Date(timestamp);
  let getHours = date.getHours();
  let getMinutes = date.getMinutes();
  if (getMinutes < 10) {
    getMinutes = `0${getMinutes}`;
  }
  if (getHours < 10) {
    getHours = `0${getHours}`;
  }
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let getDay = date.getDay();

  return `${weekdays[getDay]} ${getHours}: ${getMinutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log("forecast", forecast);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    console.log("dayyy", forecastDay.dt);

    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}°</span>
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temp.min
          )}°</span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log("coordinates", coordinates);
  let apiKey = "caa883a4a60d93878755b08a933f74ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  let temperatureElement = document.querySelector("#temperature");
  let currentCityElement = document.querySelector("#current-city");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#weather-icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  currentCityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  dateElement.innerHTML = displayCurrentDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
  getForecast(response.data.coord);

  console.log("displayWeatherCondition Function", response.data);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "96fd74caa155821910acc2f9ba5b0542";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "96fd74caa155821910acc2f9ba5b0542";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log("searchLocation [function]", apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", handleSubmit);

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", getCurrentLocation);

let cityNameInput = document.querySelector("#city-name");
cityNameInput.addEventListener("keypress", function (event) {
  if (event.keyCode == 13) {
    let city = document.querySelector("#city-name").value;
    searchCity(city);
  }
});

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("New York");
