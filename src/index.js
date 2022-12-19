import './main.css';
import { getGeographicalCoordinates, getCurrentWeatherData, getFiveDayForecastData } from './modules/weatherData';
import DOM from './modules/DOM';

const locationInput = document.querySelector('#location-input');
const tempUnitsToggle = document.querySelector('.temperature-scale-toggle');

let location = 'auckland'; // default value
let units = 'metric'; // default value

const displayWeather = async (locationName, unitType) => {
    try {
        const geographicalCoords = await getGeographicalCoordinates(locationName, unitType);
        const fiveDayForecastData = await getFiveDayForecastData(geographicalCoords, unitType);
        const currentWeatherData = await getCurrentWeatherData(geographicalCoords, unitType);
        DOM.renderLocationHeaderInfo(currentWeatherData);
        DOM.renderWeatherTodayInfo(currentWeatherData);
        DOM.renderFiveDayForecast(fiveDayForecastData);
        console.log(fiveDayForecastData);
    } catch (err) {
        console.log(err);
    }
}

// on page load
displayWeather(location, units);

locationInput.addEventListener('input', e => location = e.target.value);
locationInput.addEventListener('keydown', async e => {
    if (e.key == 'Enter') {
        displayWeather(location, units);
    }
});

const changeUnitsType = () => {
    if (units == 'metric') {
        units = 'imperial';
        tempUnitsToggle.querySelector('p:last-child').classList.add('selected');
        tempUnitsToggle.querySelector('p:first-child').classList.remove('selected');
    } else {
        units = 'metric';
        tempUnitsToggle.querySelector('p:last-child').classList.remove('selected');
        tempUnitsToggle.querySelector('p:first-child').classList.add('selected');
    }
    displayWeather(location, units);
}

// change units
tempUnitsToggle.addEventListener('click', changeUnitsType);