import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";
import { getActualWeather } from "./api/data";
import city from "../configuration/city.json";


export const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => { 
    const fetchWeather = async () => {
      setIsLoading(true);
      const data = await getActualWeather();
      setIsLoading(false);
      setWeatherData(data);
    };
    fetchWeather();
    const refreshWeatherInterval = setInterval(fetchWeather, 1000 * 60 * 60); // refresh every hour

    return () => clearInterval(refreshWeatherInterval);
  }, []);

  useEffect(() => {
    const refreshCurrentTime = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60); // refresh every minute

    return () => clearInterval(refreshCurrentTime);
  }, []);

  return isLoading ? (
    <LoadingScreen loadingMessage="Loading data..." />
  ) : weatherData && weatherData.error ? (
    <ErrorScreen errorMessage={weatherData.reason}>
    </ErrorScreen>  
    ) : weatherData ? (
    <div className={styles.wrapper}>
      <MainCard
        city={city.city}
        country={city.country}
        description={""}
        iconName={weatherData.weather_icon}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime 
            weatherData={weatherData} 
            time={currentTime}
          />
        </Header>
        <MetricsBox weatherData={weatherData} />
      </ContentBox>
    </div>
  ) : (<LoadingScreen loadingMessage="Loading data..." />)
};

export default App;

