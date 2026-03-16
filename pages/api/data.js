import { fetchWeatherApi } from "openmeteo";

import city from "../../configuration/city.json"

export async function getActualWeather() {
    const params = {
        latitude: city.latitude,
	    longitude: city.longitude,
        daily: ["sunrise", "sunset"],
	    hourly: "visibility",
        current: [
            "temperature_2m", 
            "apparent_temperature", 
            "weather_code", 
            "wind_speed_80m", 
            "relative_humidity_2m", 
            "wind_direction_10m",
            "is_day"
        ],
    };
    try {
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];
        const current = response.current();
        const hourly = response.hourly();
        const daily = response.daily();
        const is_day = current.variables(6).value();
        const utcOffsetSeconds = response.utcOffsetSeconds();
        return {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature: current.variables(0).value(),
            apparent_temperature: current.variables(1).value(),
            weather_icon: getIcon(current.variables(2).value(), is_day),
            wind_speed: current.variables(3).value(),
            relative_humidity: current.variables(4).value(),
            wind_direction: current.variables(5).value(),
            timezone : response.timezone(),
            visibility : hourly.variables(0).valuesArray()[0],
            sunrise : new Date((Number(daily.variables(0).valuesInt64(0)) + utcOffsetSeconds) * 1000),
            sunset : new Date((Number(daily.variables(1).valuesInt64(0)) + utcOffsetSeconds) * 1000),
            is_day : is_day
        };
    } catch (error) {
        return {
            error : true,
            reason : error.toString()
        }
    }
}

function getIcon(weather_code, is_day) {
    let weather_code_to_use = weather_code;

    if (weather_code > 40 && weather_code < 50) {
        weather_code_to_use = 45;
    } else if (weather_code > 50 && weather_code < 70) {
        weather_code_to_use = 61;
    } else if (weather_code > 70 && weather_code < 90) {
        weather_code_to_use = 71;
    } else if (weather_code > 90) {
        weather_code_to_use = 95;
    }
    return weather_code_to_use + (is_day == 1 ? "d" : "n");
}