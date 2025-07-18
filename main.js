const apiKey = 'e5114048d532f83801c0f3bb6e77048a';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

const searchInputElement = document.querySelector('#input-city');
const searchBtnElement = document.querySelector('#btn-search');
const weatherIconElement = document.querySelector('#weather-icon');
const weatherCardElement  = document.querySelector('.weather');
const errorElement = document.querySelector('.error');
const cityNameElement = document.querySelector('.city');
const temperatureTextElement = document.querySelector('.temp');
const humidityTextElement = document.querySelector('.humidity');
const windyTextElement = document.querySelector('.wind');

const checkWeather = async (city) => {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        if(response.status === 404 || searchInputElement.value.length === 0) {
            errorElement.style.display = 'block';
            weatherCardElement.style.display = 'none';
        }

        let data = await response.json();

        cityNameElement.innerText = searchInputElement.value[0].toUpperCase() + searchInputElement.value.slice(1);
        temperatureTextElement.innerText = Math.round(data.main.temp) + '°C';
        humidityTextElement.innerText = data.main.humidity + '%';
        windyTextElement.innerText = data.wind.speed + 'km/h';

        weatherCardElement.style.display = 'block';
        errorElement.style.display = 'none';

        const weatherIcons = {
            Clouds: "images/clouds.webp",
            Clear: "images/clear.webp",
            Rain: "images/rain.webp",
            Drizzle: "images/drizzle.webp",
            Mist: "images/mist.webp",
        };
        weatherIconElement.src = weatherIcons[data.weather[0].main];
    }
    catch (err) {
        console.log("Ошибка, неверно заполненное поле ввода мур.");
    }
}

searchBtnElement.addEventListener('click', () => {
        checkWeather(searchInputElement.value.trim());
});

searchInputElement.addEventListener( 'keyup', event => {
    if(event.code === 'Enter') checkWeather(searchInputElement.value.trim());
});
