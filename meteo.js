const weatherStatus = document.querySelector("#weather-status");
const weatherData = document.querySelector("#weather-data");

async function loadWeather() {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=45.0703&longitude=7.6869" +
    "&current=temperature_2m,wind_speed_10m" +
    "&timezone=Europe%2FRome";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Richiesta meteo non riuscita.");

    const data = await response.json();
    const current = data.current;
    if (!current) throw new Error("Dati meteo non disponibili.");

    document.querySelector("#weather-temperature").textContent =
      `${current.temperature_2m} ${data.current_units.temperature_2m}`;

    document.querySelector("#weather-wind").textContent =
      `${current.wind_speed_10m} ${data.current_units.wind_speed_10m}`;

    const timeElement = document.querySelector("#weather-time");
    timeElement.dateTime = current.time;
    timeElement.textContent = new Intl.DateTimeFormat("it-IT", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Europe/Rome"
    }).format(new Date(current.time));

    weatherData.hidden = false;
    weatherStatus.textContent = "";
  } catch (error) {
    weatherStatus.textContent =
      "Non è stato possibile caricare i dati meteo. Riprova più tardi.";
    console.error(error);
  }
}

loadWeather();