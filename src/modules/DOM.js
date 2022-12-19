import { getLocalDate, getDateInfo } from './dates';
import { getWeatherIcon, determineWindDirection } from './weatherData';
import { roundToDp, convertToPercentage, iterateEventOverNodelist } from './helperFuncs';

const locationDateInfo = document.querySelector('.location-date-info');

const mainWeatherInfoContainer = document.querySelector('.main-weather-info-container');
const weatherIcon = mainWeatherInfoContainer.querySelector('img');
const locationName = mainWeatherInfoContainer.querySelector('h2');
const locationTemp = mainWeatherInfoContainer.querySelector('h3');
const locationTempHighLow = mainWeatherInfoContainer.querySelector('h4');

const minorWeatherInfoContainer = document.querySelector('.minor-weather-info');
const sunrisePara = minorWeatherInfoContainer.querySelector('.sunrise > p:last-child');
const sunsetPara = minorWeatherInfoContainer.querySelector('.sunset > p:last-child');
const windPara = minorWeatherInfoContainer.querySelector('.wind > p:last-child');
const visibilityPara = minorWeatherInfoContainer.querySelector('.visibility > p:last-child');
const cloudinessPara = minorWeatherInfoContainer.querySelector('.cloudiness > p:last-child');
const humidityPara = minorWeatherInfoContainer.querySelector('.humidity > p:last-child');

const fiveDayForecastList = document.querySelector('.five-day-forecast > ul');
const fiveDayForecastListItems = fiveDayForecastList.querySelectorAll('li');


export default class DOM {
    static renderLocationHeaderInfo = data => {
        locationDateInfo.classList.remove('error-msg');

        const localDate = getLocalDate(data.dt, data.timezone);
        const dateInfo = getDateInfo(localDate);
        locationDateInfo.textContent = `It is ${dateInfo.localDateTime} on the ${dateInfo.localDateDayOfMonth} in ${data.name} right now`;
    }

    static renderHeaderInfoError = () => {
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

    static renderFiveDayForecast = data => {
        let index = 0
        for (const li of fiveDayForecastListItems) {
            const dayData = data.list[index];
            const dayText = li.querySelector('h4');
            const tempText = li.querySelector('.day-forecast-temp');
            const precipitationText = li.querySelector('.day-forecast-precipitation');
            const cloudinessText = li.querySelector('.day-forecast-cloudiness');
            const localDate = getLocalDate(dayData.dt, data.city.timezone);
            const localDateDay = getDateInfo(localDate).localDateDayOfWeek;

            const windText = li.querySelector('.day-forecast-wind');
            const visibilityText = li.querySelector('.day-forecast-visibility');
            const humidityText = li.querySelector('.day-forecast-humidity');

            dayText.textContent = localDateDay;
            tempText.textContent = `${roundToDp(dayData.main.temp, 0)}°`;
            precipitationText.innerHTML = `<i class="fa-solid fa-cloud-rain fa-lg"></i>${roundToDp(convertToPercentage(dayData.pop), 0)}%`;
            cloudinessText.innerHTML = `<i class="fa-solid fa-cloud"></i>${dayData.clouds.all}%`;
            windText.textContent = `Wind: ${dayData.wind.deg}° ${determineWindDirection(dayData.wind.deg)}`;
            visibilityText.textContent = `Visibility: ${dayData.visibility / 1000}km`;
            humidityText.textContent = `Humidity: ${dayData.main.humidity}%`;

            index += 8;
        }
    }

    static toggle5DayForecastExtraInfo = e => {
        const extraInfoContainer = e.target.querySelector('.forecast-details-bottom-half');
        extraInfoContainer.classList.toggle('expand');
    }
}

iterateEventOverNodelist(fiveDayForecastListItems, 'click', DOM.toggle5DayForecastExtraInfo);