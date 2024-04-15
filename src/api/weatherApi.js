var search = document.querySelector(".search");
var city = document.querySelector(".city");
var country = document.querySelector(".country");
var value = document.querySelector(".value");

var shortDesc = document.querySelector(".short-desc");
var visibility = document.querySelector(".visibility span");
var wind = document.querySelector(".wind span");
var sun = document.querySelector(".sun span");

async function changeWeather() {
  search.value.trim();
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=ha noi&appid=e5a6f540e0f4451ec67c55235fc4cb28`;

  let data = await fetch(apiURL).then((res) => res.json());
  console.log(data);
  city.innerText = data.name;
  country.innerText = data.sys.country;
  visibility.innerText = data.visibility + "m";
  wind.innerText = data.wind.speed + "m/s";
  sun.innerText = data.sun.humidity + "m/s";
}

changeWeather();
