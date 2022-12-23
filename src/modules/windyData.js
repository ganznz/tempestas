import { getGeographicalCoords } from '../index';

const WINDY_KEY = '2awMRGkgQOECeIy2WTJeQxCUKVgHYa5W';

const windyInitializeOptions = {
    key: WINDY_KEY,
    // verbose: true
}

const locationInput = document.querySelector('#location-input');

export const initiateWindy = () => {
    windyInit(windyInitializeOptions, windyAPI => {
        let [lat, lon] = getGeographicalCoords();

        const { map } = windyAPI;
        map.setView([lat, lon], 5);

        locationInput.addEventListener('keydown', async e => {
            if (e.key == 'Enter') {
                setTimeout(() => {
                    [lat, lon] = getGeographicalCoords();
                    map.flyTo([lat, lon], 5);
                }, 1000);
            }
        });
    })
};

initiateWindy();