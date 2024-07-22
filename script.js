async function fetchWeatherData(city) {
    const apiKey = 'ee1ef7a72fa44998a7e84917242207';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather').innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
    }
}

// Function to display weather data on the webpage
function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather');
    const { temp_c, feelslike_c, humidity, wind_kph, condition } = data.current;
    const { name, region, country } = data.location;

    weatherContainer.innerHTML = `
        <h2>${name}, ${region}, ${country}</h2>
        <div class="weather-info">
            <p><strong>Temperature:</strong> ${temp_c}°C</p>
            <p><strong>Feels Like:</strong> ${feelslike_c}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${wind_kph} kph</p>
            <p><strong>Condition:</strong> ${condition.text}</p>
            <img src="${condition.icon}" alt="${condition.text}">
        </div>
    `;
}

fetchWeatherData('Ottawa');
