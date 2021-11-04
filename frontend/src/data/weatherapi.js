import axios from 'axios';

const apikey= '4cf90ee7d3ed1258cc61f07da82f3db0';
const apikey1= '2f8e47a3e81a408a8da144926212909';
//const city= 'Singapore';

export const getWeatherData = async (city) =>{
    try{
        const{data}= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
        return data;
    }
    catch(error){
        throw error;
    }
}

export const getWeatherData2 = async (city) =>{
    try{
        const{data}= await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apikey1}&q=${city}}`);
        return data;
    }
    catch(error){
        throw error;
    }
}
