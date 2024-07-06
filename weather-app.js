
const apiKey = 'cad712b88beb75d39900e50dc2337bd4'; 

document.getElementById('weather-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const location = document.getElementById('location-input').value;
  const weatherInfo = document.getElementById('weather-info');
  const loading = document.getElementById('loading');

  if (location.trim() === '') {
    weatherInfo.textContent = 'Please enter a valid location.';
    return;
  }

  loading.style.display = 'block';
  weatherInfo.textContent = '';

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    const data = await response.json();

    if (response.ok) {
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const city = data.name;
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

      weatherInfo.innerHTML = `
        <p>Location: ${city}</p>
        <p>Temperature: ${temperature} K</p>
        <p>Description: ${description}</p>
        <img src="${iconUrl}" alt="Weather Icon">
      `;
    } else {
      weatherInfo.textContent = 'Error fetching weather data. Please try again later.';
    }
  } catch (error) {
    weatherInfo.textContent = 'Error fetching weather data. Please try again later.';
  }

  loading.style.display = 'none';
});
