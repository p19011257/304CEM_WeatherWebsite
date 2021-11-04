const express= require("express");
const router= express.Router();
const Weather= require('../models/weatherModel');

router.route('/weathers').get((req,res)=>{
    Weather.find()
    .then(foundWeathers => res.json(foundWeathers))
});


module.exports=router;