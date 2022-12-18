import './main.css';
import { getGeographicalCoordinates, getCurrentWeatherData, getFiveDayForecastData } from './modules/weatherData';
import DOM from './modules/DOM';

const locationInput = document.querySelector('#location-input');
let location = 'auckland'; // default value

const displayWeather = async locationName => {
    try {
        const geographicalCoords = await getGeographicalCoordinates(locationName);
        const fiveDayForecastData = await getFiveDayForecastData(geographicalCoords);
        const currentWeatherData = await getCurrentWeatherData(geographicalCoords);
        DOM.renderLocationHeaderInfo(currentWeatherData);
        DOM.renderWeatherTodayInfo(currentWeatherData);
        console.log(currentWeatherData);
    } catch (err) {
        DOM.displayHeaderInfoError()
    }
}

// on page load
displayWeather(location);

locationInput.addEventListener('input', e => location = e.target.value);
locationInput.addEventListener('keydown', async e => {
    if (e.key == 'Enter') {
        displayWeather(location);
    }
});