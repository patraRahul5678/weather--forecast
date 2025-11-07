const API_KEY = "cc540bd2c08b6929af37795a4d339c38";

const inputElement = document.getElementById("inputElement");
const searchButton = document.querySelector(".search-button");
const city = document.querySelector(".city");
const dateElement = document.querySelector(".date");
const temperature = document.querySelector(".temperature");
const feels = document.querySelector(".feels");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const tempMax = document.querySelector(".temp-max");
const tempMin = document.querySelector(".temp-min");

async function fetchWeather(cityName) {
  if (!cityName) return alert("Please enter a city name!");

  const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${API_KEY}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found!");
      return;
    }

    console.log(data);
    updateUI(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error fetching weather data. Try again later.");
  }
}

function updateUI(data) {
  city.innerText = data.name;
  temperature.innerText = `${data.main.temp}°C`;
  feels.innerText = `${data.main.feels_like}°C`;
  windSpeed.innerText = `${data.wind.speed} km/h`;
  humidity.innerText = `${data.main.humidity}%`;
  pressure.innerText = `${data.main.pressure} hPa`;
  tempMax.innerText = `${data.main.temp_max}°C`;
  tempMin.innerText = `${data.main.temp_min}°C`;

  // 🕒 Format timestamp
  let ts = data.dt;
  let date = new Date(ts * 1000);
  let formatted = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  dateElement.innerText = formatted;


  const weatherType = data.weather[0].main;
  setBackground(weatherType);
}

function setBackground(weatherType) {
  const backgrounds = {
    Clouds: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
    Clear: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1470&q=80')",
    Rain: "url('https://images.unsplash.com/photo-1527766833261-b09c3163a791?auto=format&fit=crop&w=1470&q=80')",
    Snow: "url('https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1470&q=80')",
    Thunderstorm: "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1470&q=80')",
    Drizzle: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80')",
    Mist: "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1470&q=80')",
    Default: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1470&q=80')"
  };

  document.body.style.backgroundImage =
    backgrounds[weatherType] || backgrounds.Default;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.transition = "background-image 0.8s ease-in-out";
}

searchButton.addEventListener("click", () => {
  const cityName = inputElement.value.trim();
  fetchWeather(cityName);
});

inputElement.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const cityName = inputElement.value.trim();
    fetchWeather(cityName);
  }
});
