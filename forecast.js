let theme = $(".theme");
let loader = $(".loader");
let txt = $(".ml10");

if (window.localStorage.theme == "dark") {
  // alert("dark");
  document.body.classList.remove("light-theme");
  document.body.classList.add("dark-theme");
  theme.html("Light Mode");
} else {
  // alert("light");
  document.body.classList.add("light-theme");
  document.body.classList.remove("dark-theme");
  theme.html("Dark Mode");
}

let stars = () => {
  let count = 200;
  let scene = $("#nav");
  let i = 0;
  while (i < count) {
    let star = document.createElement("i");
    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * window.innerHeight);
    let duration = Math.random() * 10;
    let size = Math.random() * 2;

    star.style.left = x + "px";
    star.style.top = y + "px";
    star.style.width = 1 + size + "px";
    star.style.height = 1 + size + "px";
    star.style.animationDuration = 6 + duration + "s";
    star.style.animationDelay = duration + "s";

    scene.append(star);
    i++;
  }
};
stars();

let getLocation = () => {
  let lng, lat;
  navigator.geolocation.getCurrentPosition((position) => {
    lng = position.coords.longitude;
    lat = position.coords.latitude;
  });
  var popup = $("#popup-wrapper");

  if (lat == null && window.localStorage.lat == null) {
    // alert("GPS not activated!");
    let error = $("#err");
    error.html("Please enable the GPS.");
    popup.addClass("show");
  } else {
    popup.removeClass("show");
  }
};

getLocation();

$(document).ready(function () {
  let nav = $("#nav");
  let main = $("#main");
  let toggler = $(".toggler");

  $(toggler).click(function (e) {
    e.preventDefault();
    $(main).toggleClass("active");
    $(this).toggleClass("fa-times");
  });

  $(theme).click(function () {
    // document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
      theme.html("Dark Mode");
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      window.localStorage.theme = "light";
    } else {
      theme.html("Light Mode");
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      window.localStorage.theme = "dark";
    }
  });
});

let Time = $("#time");

let date = new Date();
let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = weekdays[date.getDay()];
let setTime = () => {
  let date = new Date();
  let Hours = date.getHours();
  let ampm;
  Hours < 12 ? (ampm = "am") : (ampm = "pm");
  Hours == 0 ? (Hours = "12") : Hours;
  let Minutes = date.getMinutes();
  let Seconds = date.getSeconds();
  Seconds < 10 ? (Seconds = "0" + Seconds) : Seconds;
  Minutes < 10 ? (Minutes = "0" + Minutes) : Minutes;

  Hours > 12 ? (Hours -= 12) : Hours;
  Hours < 10 ? (Hours = "0" + Hours) : Hours;

  // console.log(Hours + ":" + Minutes);
  Time.html(Hours + ":" + Minutes + ":" + Seconds + `<sub>${ampm}</sub>`);
};
setTime();
setInterval(setTime, 1000);

let button = $(".button");
let inputValue = $(".inputValue");
let cnt = 7;
let apiID = "b5f558462160da78810acd0bb997a9fd";
let Dt = $("#date");
let Day = $("#day");
let Icon = $("#sicon img");
let Summary = $("#summary");
let maxMin = $("#max-min");
let city = $("#name");
let country = $("#country");
let marker = $("#marker");
marker.hide();
button.click(function (e) {
  e.preventDefault();
  $("main#forecast").hide();
  txt.show();
  loader.show();
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue.val()}&exclude=hourly&appid=${apiID}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      txt.hide();
      loader.hide();
      inputValue.val("");
      // for (let i = 0; i < data.list.length; i++) {
      //   let timestamp = data.list[i].dt;
      //   console.log(timeConverter(timestamp));
      // }
      $("main#forecast").show();
      marker.show();
      let Name = data.city.name;
      if (Name) $("tbody").empty();
      let con = data.city.country;
      country.html(con);
      city.html(Name);
      var month = new Array(12);
      month[0] = "Jan";
      month[1] = "Feb";
      month[2] = "Mar";
      month[3] = "Apr";
      month[4] = "May";
      month[5] = "Jun";
      month[6] = "Jul";
      month[7] = "Aug";
      month[8] = "Sep";
      month[9] = "Oct";
      month[10] = "Nov";
      month[11] = "Dec";
      for (let i = 0; i < data.list.length; i++) {
        let date = data.list[i].dt_txt;
        let dt = date.split(" ", 1);
        let today = dt[0].split("-").reverse().join("-");
        let day = parseInt(today.substr(0, 2));

        let index = parseInt(today.substr(3, 2));
        let mon = month[index - 1];
        let desc = data.list[i].weather[0].main;
        let icon = data.list[i].weather[0].icon;
        let max = Math.ceil(data.list[i].main.temp_max - 273.15);
        let min = Math.floor(data.list[i].main.temp_min - 273.15);

        let x = $(`.date:last`).html();
        let y = `${mon} ${day}`;
        if (x != y) {
          $("tbody").append(`
            <tr align="center">
              <th scope="row" class="date">${mon} ${day}</th>
              
              <td><img src="icons/${icon}.png" alt="icon" /></td>
              <td>${desc}</td>
              <td>${max}<sub>°C</sub> / ${min}<sub>°C</sub></td>
            </tr>
            `);
        }
      }
    })
    .catch((err) => {
      let error = $("#err");
      error.html("No match found.");
      $("#popup-wrapper").addClass("show");
    });
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

        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=b5f558462160da78810acd0bb997a9fd`
        )
          .then((response) => response.json())
          .then((data) => {
            marker.show();

            console.log(data);
            inputValue.val("");
            txt.hide();
            loader.hide();
            var month = new Array(12);
            month[0] = "Jan";
            month[1] = "Feb";
            month[2] = "Mar";
            month[3] = "Apr";
            month[4] = "May";
            month[5] = "Jun";
            month[6] = "Jul";
            month[7] = "Aug";
            month[8] = "Sep";
            month[9] = "Oct";
            month[10] = "Nov";
            month[11] = "Dec";
            let Name = data.city.name;
            let con = data.city.country;
            country.html(con);
            city.html(Name);
            for (let i = 0; i < data.list.length; i++) {
              let date = data.list[i].dt_txt;
              let dt = date.split(" ", 1);
              let today = dt[0].split("-").reverse().join("-");
              let day = parseInt(today.substr(0, 2));

              let index = parseInt(today.substr(3, 2));
              let mon = month[index - 1];
              let desc = data.list[i].weather[0].main;
              let icon = data.list[i].weather[0].icon;
              let max = Math.ceil(data.list[i].main.temp_max - 273.15);
              let min = Math.floor(data.list[i].main.temp_min - 273.15);
              // $("#forecast").append(`
              // <div class="forecast">
              //   <div class="container">
              //     <span id="date">${mon} ${day}</span>
              //     <span id="day">Today</span>
              //     <span id="sicon"><img src="icons/${icon}.png" alt="icon" /></span>
              //     <span id="summary">${desc}</span>
              //     <span id="max-min">${max}<sub>°C</sub> / ${min}<sub>°C</sub></span>
              //   </div>
              // </div>`);

              let x = $(`.date:last`).html();
              let y = `${mon} ${day}`;
              if (x != y) {
                $("tbody").append(`
                <tr align="center">
                  <th scope="row" class="date">${mon} ${day}</th>
                  
                  <td><img src="icons/${icon}.png" alt="icon" /></td>
                  <td>${desc}</td>
                  <td>${max}<sub>°C</sub> / ${min}<sub>°C</sub></td>
                </tr>
                `);
              }
            }
          })
          .catch((err) => alert("An error occured"));
      });
    } else {
      let long = window.localStorage.long;
      let lat = window.localStorage.lat;
      const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=b5f558462160da78810acd0bb997a9fd`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          marker.show();
          console.log(data);
          txt.hide();
          loader.hide();
          let Name = data.city.name;
          let con = data.city.country;
          country.html(con);
          city.html(Name);
          var month = new Array(12);
          month[0] = "Jan";
          month[1] = "Feb";
          month[2] = "Mar";
          month[3] = "Apr";
          month[4] = "May";
          month[5] = "Jun";
          month[6] = "Jul";
          month[7] = "Aug";
          month[8] = "Sep";
          month[9] = "Oct";
          month[10] = "Nov";
          month[11] = "Dec";
          let z = 0;
          for (let i = 0; i < data.list.length; i++) {
            let date = data.list[i].dt_txt;
            let dt = date.split(" ", 1);
            let today = dt[0].split("-").reverse().join("-");
            let day = parseInt(today.substr(0, 2));

            let index = parseInt(today.substr(3, 2));
            let mon = month[index - 1];
            let desc = data.list[i].weather[0].main;
            let icon = data.list[i].weather[0].icon;
            let max = Math.ceil(data.list[i].main.temp_max - 273.15);
            let min = Math.floor(data.list[i].main.temp_min - 273.15);
            // $("#forecast").append(`
            // <div class="forecast">
            //   <div class="container">
            //     <span id="date">${mon} ${day}</span>
            //     <span id="day">Today</span>
            //     <span id="sicon"><img src="icons/${icon}.png" alt="icon" /></span>
            //     <span id="summary">${desc}</span>
            //     <span id="max-min">${max}<sub>°C</sub> / ${min}<sub>°C</sub></span>
            //   </div>
            // </div>`);
            let x = $(`.date:last`).html();
            let y = `${mon} ${day}`;
            if (x != y) {
              $("tbody").append(`
            <tr align="center">
              <th scope="row" class="date">${mon} ${day}</th>
              
              <td><img src="icons/${icon}.png" alt="icon" /></td>
              <td>${desc}</td>
              <td>${max}<sub>°C</sub> / ${min}<sub>°C</sub></td>
            </tr>
            `);
            }
          }
        });
    }
  } else {
    alert("Please allow access to your location.");
  }
});
