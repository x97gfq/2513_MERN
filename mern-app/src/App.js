//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [weather, setWeather] = useState(null);
    
    const apiURL = "http://api.openweathermap.org/data/2.5/weather?id=6183858&appid=2ad263b9a82888fd39382d86aa2fc030&mode=json";

    const fetchData = async () => {
        const response = await axios.get(apiURL)
        setWeather(response.data) 
    }

    useEffect(() => {
      fetchData();
    }, []);

    return (
        <div className="App">
          <h3>Weather</h3>
          <div className="weather">
            The weather in { (weather != null? weather.name : '') } is: { (weather != null ? weather.weather[0].description : 'none') } 
          </div>
        </div>
    )
}

export default App;