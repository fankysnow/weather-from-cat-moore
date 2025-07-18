const apiKey = 'e5114048d532f83801c0f3bb6e77048a';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

const searchInputElement = document.querySelector('.search input');
const searchBtnElement = document.querySelector('.search button');
const weatherIconElement = document.querySelector('.weather-icon');

const checkWeather = async (city) => {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    let data = await response.json();

    if(response.status === 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }

    document.querySelector('.city').innerText = searchInputElement.value[0].toUpperCase() + searchInputElement.value.slice(1);
    document.querySelector('.temp').innerText = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerText = data.main.humidity + '%';
    document.querySelector('.wind').innerText = data.wind.speed + 'km/h';

    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';

    switch (data.weather[0].main) {
        case 'Clouds': weatherIconElement.src="images/clouds.webp"; break;
        case 'Clear': weatherIconElement.src="images/clear.webp"; break;
        case 'Rain': weatherIconElement.src="images/rain.webp"; break;
        case 'Drizzle': weatherIconElement.src="images/drizzle.webp"; break;
        case 'Mist': weatherIconElement.src="images/mist.webp"; break;
    }
}

searchBtnElement.addEventListener('click', () => {
        checkWeather(searchInputElement.value.trim());
});

searchInputElement.addEventListener( 'keyup', event => {
    if(event.code === 'Enter') checkWeather(searchInputElement.value.trim());
});
