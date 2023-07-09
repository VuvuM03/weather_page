let updatedTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let formattedDate = `${currentDay} ${hours}:${minutes}`;
  return formattedDate;
}
let formattedDate = formatDate(updatedTime);
document.querySelector("#date").innerHTML = formattedDate;

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
let cityForm = document.querySelector("#find-city");
cityForm.addEventListener("submit", citySearch);

function showTemperature(response) {
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}&deg C`;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#location");
button.addEventListener("click", showPosition);
