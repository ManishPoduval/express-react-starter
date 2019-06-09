var express = require('express');
var router = express.Router();
const fs = require('fs');


let rawdata = fs.readFileSync('./FullStackTest_DeliveryAreas.json');  
let locationPolygons = JSON.parse(rawdata);  


router.post('/location', function(req, res, next) {
   console.log(req.body)
   let locName = 'Not Found';
   locationPolygons.features.forEach((feature) => {
          const {geometry: {coordinates}, properties: {name}} =  feature;
          if (coordinates[0].length) {
            coordinates[0].forEach((feature) => {
              const { lat, lng } = req.body.location
              if (Number(lng.toFixed(2) === coordinates[0] && Number(lat.toFixed(2)) == coordinates[1] )) {
                locName = name;
              }
            })
          }
          else {
            const { lat, lng } = req.body.location
              if (Number(lng.toFixed(2) === coordinates[0] && Number(lat.toFixed(2)) == coordinates[1] )) {
                locName = name;
              }
          }
   })
   res.json({locName});
});

module.exports = router;
