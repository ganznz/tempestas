import { roundToDp } from './helperFuncs';
import DOM from './DOM';

const OPENWEATHER_KEY = 'e139145074965f3b3ff44caf7777fb07';

export const getGeographicalCoordinates = async (locationName, units) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=${OPENWEATHER_KEY}&units=${units}`, {mode: 'cors'});
        const data = await response.json();
        const lat = roundToDp(data[0].lat, 2);
        const lon = roundToDp(data[0].lon, 2);
        return [lat, lon];
    } catch (err) {
        throw new Error((`${locationName} is an invalid location.`));
    }
}

export const getFiveDayForecastData = async (geographicalCoords, units) => {
    try {
        const [lat, lon] = geographicalCoords;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}&units=${units}`, {mode: 'cors'});
        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error((`Unable to parse geographical coordinates. Check if you input a valid location.`));
    }
}

export const getCurrentWeatherData = async (geographicalCoords, units) => {
    try {
        const [lat, lon] = geographicalCoords;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}&units=${units}`, {mode: 'cors'});
        const data = await response.json();
        return data;
    } catch {
        throw new Error((`Unable to parse geographical coordinates. Check if you input a valid location.`));
    }
}

export const getWeatherIcon = iconID => {
    try {
        return `https://openweathermap.org/img/wn/${iconID}@4x.png`;
    } catch (err) {
        console.log(err);
    }
}

export const determineWindDirection = windDeg => {
    switch (true) {
        case (windDeg < 20):
            return 'N';
        case windDeg < 60:
            return 'NE';
        case windDeg < 110:
            return 'E';
        case windDeg < 150:
            return 'SE';
        case windDeg < 200:
            return 'S';
        case (windDeg < 240):
            return 'SW';
        case windDeg < 280:
            return 'W';
        case windDeg < 330:
            return 'NW';
        case windDeg <= 360:
            return 'N';
    }
}