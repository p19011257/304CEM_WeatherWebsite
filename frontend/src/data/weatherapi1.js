import axios from 'axios';
const apikey1= '2efecdb9300b4a1eacd0033d6901a9d5';

export const getWeatherData2 = async (city) =>{
    try{
        const{data}= await axios.get(`http://api.weatherbit.io/v2.0/current?&city=${city}&key=${apikey1}`);
        return data;
    }
    catch(error){
        throw error;
    }
}