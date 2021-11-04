const express = require ('express');
const app= express();
const cors= require('cors');
const mongoose=require('mongoose');
const Weather=require('./models/weatherModel');
const port= process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://chunyee518:chunyee@cluster0.csmyj.mongodb.net/WeatherDB?retryWrites=true&w=majority")

app.use("/",require('./routes/nodeRoute'));

app.post('/create', function(req,res){
    const weatherCountry=req.body.weatherCountry;
    const weatherTemperature=req.body.weatherTemperature;
    const weatherMaxTemperature=req.body.weatherMaxTemperature;
    const weatherMinTemperature=req.body.weatherMinTemperature;
    const newWeather= new Weather({
        weatherCountry,
        weatherTemperature,
        weatherMaxTemperature,
        weatherMinTemperature
    });
    newWeather.save();
});
app.delete('/delete/:id',function(req,res){
    const id=req.params.id;
    Weather.findByIdAndDelete({_id:id},function(err){
        if(!err){
            console.log("movie deleted")
        }else{
            console.log(err);
        }
    })
})

if(process.env.NODE_ENV==='production'){
    app.use(express.static('frontend/build'));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    })
}

app.listen(port,function(){
    console.log("express server running at 5000");
})

