import { useEffect, useState } from 'react';
import './WeatherComponent.css';
import axios from 'axios';
import React, { useMemo } from 'react';
import { API_URL } from '../../APIHelper';
import { API_KEY } from '../../constants';

export default function WeatherComponent(weather, ...props) {
    
    const [weatherData, setWeatherData] = useState();

    const cachedWeatherData = useMemo(() => weatherData, [weatherData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}?id=${weather.cityCode}&appid=${API_KEY}`);
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const cachedDataExpirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    const cachedDataExpirationTimer = setTimeout(() => {
      setWeatherData(null);
    }, cachedDataExpirationTime);

    if (!cachedWeatherData) {
      fetchData();
    }

    return () => clearTimeout(cachedDataExpirationTimer);
  }, [cachedWeatherData, weather.cityCode]);

  return (
    <>
      <div className="weather-container">
        <span className='close-button'> &#x2715;</span>
        <div className="location-section">
          <div className="location-data">
            <span className="location">{weather.cityName}, {weatherData?.sys?.country}</span>
            <span className="date-time">{new Date(weatherData?.dt * 1000).toLocaleTimeString()}, {new Date(weatherData?.dt * 1000).toDateString()}</span>
            <span>{weatherData?.weather && weatherData.weather.length > 0 ? `${weatherData.weather[0].icon} ${weatherData.weather[0].description}` : ''}</span>

          </div>
          <div className="wheather">
            <span className="celcius">{weather.temp}&deg;c</span>
            <span className="sub-details data-title">Temp Min: {Math.round(weatherData?.main?.temp_min / 10)}%</span>
            <span className="sub-details data-title">Temp Max: {Math.round(weatherData?.main?.temp_max / 10)}%</span>
          </div>
        </div>
        <div className="extra-details">
          <div className="phv-details">
            <div className="phv-stack">
              <span className="data-title">Pressure: </span>
              <p className="data-value">{weatherData?.main?.pressure}hPa</p>
            </div>
            <div className="phv-stack">
              <span className="data-title">Humidity: </span>
              <p className="data-value">{weatherData?.main?.humidity}%</p>
            </div>
            <div className="phv-stack">
              <span className="data-title">Visibility: </span>
              <p className="data-value">{weatherData?.visibility}km</p>
            </div>
          </div>

          <div className="wind-details">
            <span className="wind-icon">
              <i className="fa fa-location-arrow" aria-hidden="true"/>
            </span>
            <p className="wind-speed">{weatherData?.wind?.speed}m/s {weatherData?.wind?.deg} degree</p>
          </div>

          <div className="sun-rise-set-data">
            <div className="sun-details">
              <p className="data-title">Sunrise: </p>
              <p className="data-value">{new Date(weatherData?.sys?.sunrise * 1000).toLocaleTimeString()}</p>
            </div>
            <div className="sub-details">
              <span className="data-title">Sunset: </span>
              <p className="data-value">{new Date(weatherData?.sys?.sunset * 1000).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
