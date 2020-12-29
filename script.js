$(document).ready(function () {
  let nav = $("#nav");
  let main = $("#main");
  let toggler = $(".toggler");

  $(toggler).click(function (e) {
    e.preventDefault();
    $(main).toggleClass("active");
    $(this).toggleClass("fa-times");
  });
});
let button = $(".button");
let inputValue = $(".inputValue");
let Feel = $("#feel");
let Humid = $("#humid");
let Wind = $("#wind");
let Pressure = $("#pressure");
let Name = $("#name");
let Temp = $("#temp");
let Descriprion = $("#description");
let Marker = $("#marker");
let Slash = $("#slash");
let Max = $("#max");
let Min = $("#min");
let Country = $("#country");
let Desc = $("#desc");
let Day = $("#day");
let More = $(".more");
let Time = $("#time");
let Direction = $("#direction");
More.hide();
Descriprion.hide();
Marker.hide();
Slash.hide();

function getDirection(direction) {
  if (direction > 348.75 || direction <= 11.25) {
    direction = "N";
  } else if (direction > 11.25 && direction <= 33.75) {
    direction = "NNE";
  } else if (direction > 33.75 && direction <= 56.25) {
    direction = "NE";
  } else if (direction > 56.25 && direction <= 78.75) {
    direction = "ENE";
  } else if (direction > 78.75 && direction <= 101.25) {
    direction = "E";
  } else if (direction > 101.25 && direction <= 123.75) {
    direction = "ESE";
  } else if (direction > 123.75 && direction <= 146.25) {
    direction = "SE";
  } else if (direction > 146.25 && direction <= 168.75) {
    direction = "SSE";
  } else if (direction > 168.75 && direction <= 191.25) {
    direction = "S";
  } else if (direction > 191.25 && direction <= 213.75) {
    direction = "SSW";
  } else if (direction > 213.25 && direction <= 236.75) {
    direction = "SW";
  } else if (direction > 236.75 && direction <= 258.25) {
    direction = "WSW";
  } else if (direction > 258.25 && direction <= 281.75) {
    direction = "W";
  } else if (direction > 281.75 && direction <= 303.25) {
    direction = "WNW";
  } else if (direction > 303.25 && direction <= 326.75) {
    direction = "NW";
  } else if (direction > 326.75 && direction <= 348.75) {
    direction = "NNW";
  }
  return direction;
}

let date = new Date();
let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = weekdays[date.getDay()];
function setTime() {
  let date = new Date();
  let Hours = date.getHours();
  Hours == 0 ? (Hours = "12") : Hours;
  let Minutes = date.getMinutes();
  let Seconds = date.getSeconds();
  Seconds < 10 ? (Seconds = "0" + Seconds) : Seconds;
  // console.log(Hours + ":" + Minutes);
  Time.html(Hours + ":" + Minutes + ":" + Seconds);
}
setTime();
setInterval(setTime, 1000);

// let api = `https://pro.openweathermap.org/data/2.5/forecast/climate?q=${inputValue},in&appid=b5f558462160da78810acd0bb997a9fd`;
button.click(function (e) {
  e.preventDefault();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.val()}&appid=b5f558462160da78810acd0bb997a9fd`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let max = Math.ceil(data.main.temp_min - 273.15);
      let min = Math.floor(data.main.temp_min - 273.15);
      let temp = Math.floor(data.main.temp - 273.15);
      let desc = data.weather[0].main;
      let name = data.name;
      let country = data.sys.country;
      let feel = Math.floor(data.main.feels_like - 273.15);
      let humidity = data.main.humidity;
      let pressure = data.main.pressure;
      let wind = data.wind.speed;
      let direction = data.wind.deg;

      let dir = getDirection(direction);
      Direction.html(dir);
      var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
      console.log(index);
      More.show();
      Wind.html(wind);
      Feel.html(feel);
      Humid.html(humidity);
      Pressure.html(pressure);
      Name.html(name);
      Temp.html(temp + " <sup>°C</sup> ");
      Descriprion.show();
      Marker.show();
      Slash.show();
      Max.html(max + "°C");
      Min.html(min + "°C");
      Country.html(country);
      Desc.html(desc);
      Day.html(day);
    })
    .catch((err) => alert("Wrong"));
});

$(document).ready(function () {
  let long;
  let lat;
  if (navigator.geolocation) {
    var storedValues = window.localStorage.long;
    if (!storedValues) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        window.localStorage.lat = lat;
        window.localStorage.long = long;

        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b5f558462160da78810acd0bb997a9fd`;

        fetch(api)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            let max = Math.ceil(data.main.temp_min - 273.15);
            let min = Math.floor(data.main.temp_min - 273.15);
            let temp = Math.floor(data.main.temp - 273.15);
            let desc = data.weather[0].main;
            let name = data.name;
            let country = data.sys.country;
            let feel = Math.floor(data.main.feels_like - 273.15);
            let humidity = data.main.humidity;
            let pressure = data.main.pressure;
            let wind = data.wind.speed;
            More.show();
            let direction = data.wind.deg;

            let dir = getDirection(direction);
            Direction.html(dir);
            Wind.html(wind);
            Feel.html(feel);
            Humid.html(humidity);
            Pressure.html(pressure);
            Name.html(name);
            Temp.html(temp + " <sup>°C</sup> ");
            Descriprion.show();
            Marker.show();
            Slash.show();
            Max.html(max + "°C");
            Min.html(min + "°C");
            Country.html(country);
            Desc.html(desc);
            Day.html(day);
          });
      });
    } else {
      let long = window.localStorage.long;
      let lat = window.localStorage.lat;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b5f558462160da78810acd0bb997a9fd`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          let max = Math.ceil(data.main.temp_min - 273.15);
          let min = Math.floor(data.main.temp_min - 273.15);
          let temp = Math.floor(data.main.temp - 273.15);
          let desc = data.weather[0].main;
          let name = data.name;
          let country = data.sys.country;
          let feel = Math.floor(data.main.feels_like - 273.15);
          let humidity = data.main.humidity;
          let pressure = data.main.pressure;
          let wind = data.wind.speed;
          More.show();
          let direction = data.wind.deg;

          let dir = getDirection(direction);
          Direction.html(dir);
          Wind.html(wind);
          Feel.html(feel);
          Humid.html(humidity);
          Pressure.html(pressure);
          Name.html(name);
          Temp.html(temp + " <sup>°C</sup> ");
          Descriprion.show();
          Marker.show();
          Slash.show();
          Max.html(max + "°C");
          Min.html(min + "°C");
          Country.html(country);
          Desc.html(desc);
          Day.html(day);
        });
    }
  } else {
    alert("Please allow access to your location.");
  }
});
