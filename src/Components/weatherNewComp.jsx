import { useEffect } from "react";
import { useState } from "react";
import { ProgressBar } from "react-loader-spinner";
import style from "../Styles/weatherapp.module.css";
const WeatherNewComp = () => {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function getweatherData() {
    try {
      setLoading(true);
      let API_KEY = process.env.REACT_APP_API_KEY;
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );

      let result = await response.json();

      console.log(result);

      if (result.cod == "404") {
        setError(result.message);
        console.log("Error Occured");
      }
      if (result.cod !== "400" && result.cod !== "404") {
        setWeatherData(result);
        setError("");
      }
    } catch (error) {
      console.log("Error message is ", error);
      // setError("an error occurred while fetching request");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getweatherData();
  }, [cityName]);

  // ===================================================================================================

  function convertToCelcius(temp) {
    let newTemp = temp - 273;
    return Math.floor(newTemp);
  }

  function convertToHg(pres) {
    let newPres = pres * 0.02953;
    return Math.round(newPres);
  }

  function timeConverter(tim) {
    let unix_timestamp = tim;

    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();

    var formattedTime = hours + ":" + minutes.substr(-2);
    console.log(formattedTime);
    return formattedTime;
  }

  function convertDistance(dis) {
    let newDis = dis / 1000;
    return newDis;
  }

  // ===================================================================================================
  return (
    <>
      <div className={style.mainBox}>
        <h2 className={style.hea2}>Weather in your City</h2>

        <input
          className={style.inputField}
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter your City"
        />

        <br />

        <div>
          {loading && (
            <ProgressBar
              height="80"
              width="80"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{}}
              wrapperClass="progress-bar-wrapper"
              borderColor="white"
              barColor="black"
            />
          )}
        </div>

        {error && (
          <p style={{ color: "red", textAlign: "center" }}>Error: {error} </p>
        )}

        {weatherData && (
          <div className={style.innerBox}>
            <p className={style.cityName}>City: {weatherData.name}</p>

            <p className={style.countryName}>
              Country: {weatherData?.sys?.country}
            </p>

            <div className={style.com1}>
              {weatherData.weather && (
                <img
                  className={style.imageData}
                  src={`${weatherData?.weather[0].icon}.svg`}
                  alt="img"
                />
              )}


              <div className={style.com5}>
                <p className={style.cityTempNor}>
                  {convertToCelcius(weatherData?.main?.temp)}&#176;C
                </p>
                <hr />

                <p className={style.cityTempMaxMin}>
                  Max:{convertToCelcius(weatherData?.main?.temp_max)}&#176;C /
                  Min:
                  {convertToCelcius(weatherData?.main?.temp_min)}&#176;C
                </p>
              </div>
            </div>

            <div className={style.com2}>
              <div className={style.com3}>
                <p className={style.cityTemp}>
                  Description:{" "}
                  {weatherData.weather && weatherData?.weather[0].description}
                </p>
                <p className={style.cityTemp}>
                  Pressure: {convertToHg(weatherData?.main?.pressure)}inHg
                </p>
                <p className={style.cityTemp}>
                  Humidity: {weatherData?.main?.humidity} %
                </p>
                <p className={style.cityTemp}>
                  Clouds: {weatherData?.clouds?.all} %
                </p>
              </div>

              <div className={style.com4}>
                <p className={style.cityTemp}>
                  Sunrise: {timeConverter(weatherData?.sys?.sunrise)}
                </p>

                <p className={style.cityTemp}>
                  Sunset: {timeConverter(weatherData?.sys?.sunset)}
                </p>

                <p className={style.cityTemp}>
                  Wind Speed: {weatherData?.wind?.speed} km/h
                </p>

                <p className={style.cityTemp}>
                  Wind Direction: {weatherData?.wind?.deg}&#176;
                </p>

                <p className={style.cityTemp}>
                  Visibility: {convertDistance(weatherData?.visibility)} km
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherNewComp;
