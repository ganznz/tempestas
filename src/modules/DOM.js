import { getLocalDate, getDateInfo } from './dates';
import { getWeatherIcon, determineWindDirection } from './weatherData';
import { roundToDp } from './helperFuncs';

const locationDateInfo = document.querySelector('.location-date-info');

const mainWeatherInfoContainer = document.querySelector('.main-weather-info-container');
const weatherIcon = mainWeatherInfoContainer.querySelector('img');
const locationName = mainWeatherInfoContainer.querySelector('h2');
const locationTemp = mainWeatherInfoContainer.querySelector('h3');
const locationTempHighLow = mainWeatherInfoContainer.querySelector('h4');

const minorWeatherInfoContainer = document.querySelector('.minor-weather-info');
const sunrisePara = minorWeatherInfoContainer.querySelector('.sunrise > p:last-child');
const sunsetPara = minorWeatherInfoContainer.querySelector('.sunset > p:last-child');
// const precipitationPara = minorWeatherInfoContainer.querySelector('.precipitation > p:last-child');
const windPara = minorWeatherInfoContainer.querySelector('.wind > p:last-child');
const visibilityPara = minorWeatherInfoContainer.querySelector('.visibility > p:last-child');
const cloudinessPara = minorWeatherInfoContainer.querySelector('.cloudiness > p:last-child');
const humidityPara = minorWeatherInfoContainer.querySelector('.humidity > p:last-child');
// const uvIndexPara = minorWeatherInfoContainer.querySelector('.uv-index > p:last-child');

const fiveDayForecastList = document.querySelector('.five-day-forecast > ul');
const fiveDayForecastListItems = fiveDayForecastList.querySelectorAll('li');


export default class DOM {
    static renderLocationHeaderInfo = data => {
        locationDateInfo.classList.remove('error-msg');
        
        const localDate = getLocalDate(data.dt, data.timezone);
        const dateInfo = getDateInfo(localDate);
        locationDateInfo.textContent = `It is ${dateInfo.localDateTime} on the ${dateInfo.localDateDayOfMonth} in ${data.name} right now`;
    }

    static displayHeaderInfoError = () => {
        locationDateInfo.classList.add('error-msg');
        locationDateInfo.textContent = `Can't find that location. Please check if it's valid!`;
    }

    static renderWeatherTodayInfo = data => {
        DOM.renderWeatherTodayMainInfo(data);
        DOM.renderWeatherTodayMinorInfo(data);
    }

    static renderWeatherTodayMainInfo = data => {
        const weatherIconImage = getWeatherIcon(data.weather[0].icon);
        weatherIcon.src = weatherIconImage;
        locationName.textContent = data.name;
        locationTemp.textContent = `${roundToDp(data.main.temp, 0)}°`;
        locationTempHighLow.textContent = `L:${roundToDp(data.main.temp_min, 0)}°  H:${roundToDp(data.main.temp_max, 0)}°`;
    }

    static renderWeatherTodayMinorInfo = data => {
        const sunriseTime = getLocalDate(data.sys.sunrise, data.timezone);
        const sunriseTimeDateInfo = getDateInfo(sunriseTime);
        sunrisePara.textContent = sunriseTimeDateInfo.localDateTime;

        const sunsetTime = getLocalDate(data.sys.sunset, data.timezone);
        const sunsetTimeDateInfo = getDateInfo(sunsetTime);
        sunsetPara.textContent = sunsetTimeDateInfo.localDateTime;
        const windDirection = determineWindDirection(data.wind.deg);
        windPara.textContent = `${data.wind.deg}° ${windDirection}`;
        visibilityPara.textContent = `${data.visibility / 1000}km`;
        cloudinessPara.textContent = `${data.clouds.all}%`;
        humidityPara.textContent = `${data.main.humidity}%`;
    }
}