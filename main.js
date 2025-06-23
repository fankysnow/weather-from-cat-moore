const apiKey = 'e5114048d532f83801c0f3bb6e77048a';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

const checkWeather = async (city) => {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    let data = await response.json();

    if(response.status === 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }

    document.querySelector('.city').innerText = searchInput.value[0].toUpperCase() + searchInput.value.slice(1);
    document.querySelector('.temp').innerText = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerText = data.main.humidity + '%';
    document.querySelector('.wind').innerText = data.wind.speed + 'km/h';

    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';

    switch (data.weather[0].main) {
        case 'Clouds': weatherIcon.src="images/clouds.webp"; break;
        case 'Clear': weatherIcon.src="images/clear.webp"; break;
        case 'Rain': weatherIcon.src="images/rain.webp"; break;
        case 'Drizzle': weatherIcon.src="images/drizzle.webp"; break;
        case 'Mist': weatherIcon.src="images/mist.webp"; break;
    }
}

searchBtn.addEventListener('click', () => {
        checkWeather(searchInput.value);
});

searchInput.addEventListener( 'keyup', event => {
    if(event.code === 'Enter') checkWeather(searchInput.value);
});
