import React,{useState,useEffect} from 'react'
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import{getWeatherData} from './data/weatherapi';
import{getWeatherData2} from './data/weatherapi';
import { eventNames } from 'node-notifier';
//import Weather from './data/databaseconnect';

function App() { 
  const [weatherdata, setWeatherData]=useState(null);
  const [weatherdata2, setWeatherData2]=useState(null);
  const[city,setCity]=useState('');
  const[weathers,setWeathers]=useState([{
        weatherCountry:'',
        weatherTemperature:'',
        weatherMaxTemperature:'',
        weatherMinTemperature:''
  }]);
  
  const[loading,setLoading]=useState(false);
  
  function deleteWeather(id){
    axios.delete('/delete/'+id);
    alert("Weather Deleted");
  }
  const getData= async()=>{
    try{
      const data= await getWeatherData(city); 
      const data1=await getWeatherData2(city);
      setWeatherData(data);
      setWeatherData2(data1);
      //console.log(data);
      //console.log(data1);
      
      
    }
    catch(error){
      console.log(error.message);
    }
  }
  useEffect(() => {
    getData();
  },[]);
  useEffect(()=>{
    fetch('/weathers')
    .then(res=>{
      if(res.ok){
        return res.json()
      }
    }).then(jsonRes=>setWeathers(jsonRes));
  })
  function handleClick(event){
    event.preventDefault();
    const newWeather={
      weatherCountry:weatherdata.name,
      weatherTemperature:weatherdata2.current.temp_c,
      weatherMaxTemperature:parseFloat(weatherdata.main.temp_max - 273.15).toFixed(1),
      weatherMinTemperature:parseFloat(weatherdata.main.temp_min - 273.15).toFixed(1),

    }
    console.log(weatherdata.sys.country);
    console.log(weatherdata2.current.temp_c)
    axios.post('/create',newWeather)
  }

  return (
    <div className="App">
      <div className="card">
        <h2 className="title"><i className="fa fa-cloud"></i> WeatherApp</h2>
        <div className="search">
          <input type="text" onChange={(e)=>setCity(e.target.value)} placeholder="Enter the city name"/>
          <button type="button" onClick={() =>getData()}>Search</button>
          <div class="divider"/>
          <button onClick={handleClick}>Save</button>
        </div>
        {weatherdata2 !==null?(
           <div className="main-container">
           <h4> Live Condition </h4>
           <div className="weather-icon">
            <img src={`http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`}alt="imgicon"/>
           </div>
           <h3>{weatherdata.weather[0].main}</h3>
           <div className="temperature">
             <h1>{parseFloat(weatherdata2.current.temp_c).toFixed(1)}&deg;</h1>
           </div>
           <div className="location">
             <h3><i className="fa fa-street-view"></i>{weatherdata.name} | {weatherdata.sys.country}</h3>
           </div>
           <div className="temperature-range">
             <h6>Min:{parseFloat(weatherdata.main.temp_min - 273.15).toFixed(1)}&deg;C || Max:{parseFloat(weatherdata.main.temp_max - 273.15).toFixed(1)}&deg;C || Humidity:{weatherdata.main.humidity}%</h6>
           </div>
         </div>
        ):null}
       
      </div>
      <div className="weather-data">
        <h1> Weather Data</h1>
        <table>
            <thead>
              <tr>
                <th>City</th>
                <th>Temperature</th>
                <th>Max Temperature</th>
                <th>Min Temperature</th>
                <th>Action</th>
              </tr>
            </thead>
       
         <tbody>
          {weathers.map((weather=>
              <tr>
              <td>{weather.weatherCountry}</td>
              <td>{weather.weatherTemperature}&deg;C</td>
              <td>{weather.weatherMaxTemperature}&deg;C</td>
              <td>{weather.weatherMinTemperature}&deg;C</td>
              <td>
                  <button type="button" onClick={()=> deleteWeather(weather._id)}>Delete</button>
              </td>
              </tr>
          ))}
          </tbody>
          </table>
      </div>
    </div>
  );
}

export default App;

