import { getWeekDay } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, time }) => {

  return (
    <div className={styles.wrapper}>
      <h2>
        {
        getWeekDay(weatherData)
        },{" "}
        {
        time.getHours().toLocaleString()
        //weatherData.time.toLocaleTimeString()
        }:
        {time.getMinutes() < 10 ? "0" : ""}
        {time.getMinutes().toLocaleString()}{" "}
      </h2>
    </div>
  );
};