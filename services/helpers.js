import {
  unixToLocalTime,
} from "./converters";

export const getWindSpeed = (windSpeed) => windSpeed.toFixed(0);

export const getVisibility = (visibilityInMeters) => (visibilityInMeters / 1000).toFixed(1)

export const getTime = (currentTime, timezone) => unixToLocalTime(currentTime, timezone);

export const getWeekDay = (weatherData) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[weatherData.time.getUTCDay()]
};
