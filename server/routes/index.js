var express = require('express');
var router = express.Router();
const fs = require('fs');


let rawdata = fs.readFileSync('./FullStackTest_DeliveryAreas.json');  
let locationPolygons = JSON.parse(rawdata);  


router.post('/location', function(req, res, next) {
   console.log(req.body)
   let locName = 'Not Found';
   locationPolygons.features.forEach((feature) => {
    const {geometry: {coordinates}, properties: {Name}} =  feature;
    if (coordinates[0].length) {
      coordinates[0].forEach((coOrdinate) => {
        const { lat, lng } = req.body.location;
        if (Number(lng.toFixed(2) == Number(coOrdinate[0].toFixed(2)) && Number(lat.toFixed(2)) == Number(coOrdinate[1].toFixed(2)) )) {
          locName = Name;
        }
      })
    }
    else {
      const { lat, lng } = req.body.location;
        if (Number(lng.toFixed(2) == Number(coordinates[0].toFixed(2)) && Number(lat.toFixed(2)) == Number(coordinates[1].toFixed(2)) )) {
          locName = Name;
        }
    }
})
   res.json({locName});
});

module.exports = router;
