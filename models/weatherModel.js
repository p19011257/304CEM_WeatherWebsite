const mongoose= require('mongoose');

const weatherSchema=new mongoose.Schema({
    weatherCountry:{type: String},
    weatherTemperature:{type: String},
    weatherMaxTemperature:{type: String},
    weatherMinTemperature:{type: String},
});

const Weather=mongoose.model('weathers',weatherSchema);

module.exports=Weather;

