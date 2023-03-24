import React, { useEffect } from 'react';
import WeatherComponent from "./Components/WeatherApp/WeatherComponent";
import cities from "C:/Users/Saleem Malik/Desktop/NODE/my-app/src/Components/WeatherApp/cities.json";

function App() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 5 * 60 * 1000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <div className="container">
      
      <div class="search-bar">
  <input type="text" placeholder="Search..."/>
  <button type="submit">Add</button>
</div>
      {cities.List.map(city => (
        <WeatherComponent 
          cityCode={city.CityCode}
          cityName={city.CityName} 
          temp={city.Temp}
          status={city.Status}
        />
      ))}
      </div>
      
    </>
  );
}

export default App;
