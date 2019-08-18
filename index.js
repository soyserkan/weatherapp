const appKey = "3c07d42acd25f3454b164f1364915dfe";

let searchButton = document.getElementById("search-btn");
let lon = document.getElementById("lon");
let lat = document.getElementById("lat");
let cityName = document.getElementById("city-name");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");

searchButton.addEventListener("click", findWeatherDetails);

function findWeatherDetails() {
  if (lon.value !== "" && lat.value !== "") {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat.value + "&lon=" + lon.value + "&appid=" + appKey;
    httpRequestAsync(searchLink, theResponse);
  }
}

function theResponse(response) {
  let jsonObject = JSON.parse(response);
  console.log(jsonObject);
  cityName.innerHTML = "City: " + jsonObject.name;
  temperature.innerHTML = "Temperature: " + parseInt(jsonObject.main.temp - 273) + "°";
  humidity.innerHTML = "Humidity: " + jsonObject.main.humidity + "%";
}

function httpRequestAsync(url, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200)
      callback(httpRequest.responseText);
  }
  httpRequest.open("POST", url, true);
  httpRequest.send();
}