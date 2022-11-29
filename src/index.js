const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function displayCurrentDate() {
  let currentDate = document.querySelector("#current-date");
  let date = new Date();
  let getDay = date.getDay();
  getDay = weekdays[getDay];
  let getHours = date.getHours();
  let getMinutes = date.getMinutes();
  getMinutes = getMinutes < 10 ? "0" + getMinutes : getMinutes;

  let displayDate = `${getDay}, ${getHours}:${getMinutes}`;
  currentDate.innerHTML = displayDate;
}

function displayWeatherCondition(response) {
  document.querySelector("#input-city").innerHTML = response.data.name;
  document.querySelector(".current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  console.log("displayWeatherCondition", response.data);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "96fd74caa155821910acc2f9ba5b0542";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //   console.log("Search City [function]", apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "96fd74caa155821910acc2f9ba5b0542";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log("searchLocation [function]", apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", handleSubmit);

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", getCurrentLocation);

let cityInput = document.querySelector("#input-city");
cityInput.addEventListener("keypress", function (event) {
  //   event.preventDefault();
  if (event.keyCode == 13) {
    let city = document.querySelector("#input-city").value;
    searchCity(city);
  }
});

displayCurrentDate();
searchCity("Honolulu");
