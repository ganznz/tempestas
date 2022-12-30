import './main.css';
import { getGeographicalCoordinates, getCurrentWeatherData, getFiveDayForecastData } from './modules/openWeatherData';
import DOM from './modules/DOM';
import { initiateWindy } from './modules/windyData';

const locationInput = document.querySelector('#location-input');
const tempUnitsToggle = document.querySelector('.temperature-scale-toggle');

let location = 'auckland'; // default value
let units = 'metric'; // default value

// update variable with data when it gets requested
let geographicalCoords;
let fiveDayForecastData;
let currentWeatherData;

export const getGeographicalCoords = () => geographicalCoords;

const getAllWeatherData = async (location, units) => {
    geographicalCoords = await getGeographicalCoordinates(location, units);
    fiveDayForecastData = await getFiveDayForecastData(geographicalCoords, units);
    currentWeatherData = await getCurrentWeatherData(geographicalCoords, units);
}

const displayWeather = async (location, units) => {
    try {
        await getAllWeatherData(location, units);
        DOM.renderLocationHeaderInfo(currentWeatherData);
        DOM.renderWeatherTodayInfo(currentWeatherData);
        DOM.renderFiveDayForecast(fiveDayForecastData);
    } catch (err) {
        console.log(err);
        DOM.renderHeaderInfoError();
    }
}

// on page load
displayWeather(location, units);

// change location
locationInput.addEventListener('input', e => location = e.target.value);
locationInput.addEventListener('keydown', async e => {
    if (e.key == 'Enter') {
        displayWeather(location, units);
    }
});
locationInput.addEventListener('focusout', e => displayWeather(location, units));


// change units
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
tempUnitsToggle.addEventListener('click', changeUnitsType);
