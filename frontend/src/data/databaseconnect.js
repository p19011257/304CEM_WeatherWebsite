import mongoose from 'mongoose';

const db="mongodb+srv://chunyee518:chunyee@cluster0.csmyj.mongodb.net/WeatherDB?retryWrites=true&w=majority";

mongoose
.connect(db)
.then(() => {
console.log("Connected To Database");
}
)

.catch(() => {
console.log("Error to connect database");
}
)


const weatherSchema = new mongoose.Schema({

    weatherCountry: {type: String},

    weatherTemperature: {type: String},

    weatherMinTemperature: {type: String},

    weatherMaxTemperature: {type: String}

}

);



const Weather = mongoose.model('weathers', weatherSchema);

export default Weather;