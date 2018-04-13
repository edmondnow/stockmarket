const express = require('express');
const router = express.Router();
const keys = require('../config/config');
const request = require('request');
const moment = require('moment');
var colorIterator = -1;


router.get('/', function(req, res, next){
  res.render('index');
})

router.post('/getstock', function(req, res, next) {
  var stock = req.body.stock;
  var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&apikey='+ keys.alphaKey + '&symbol=' + stock;
  request(url, function (err, response, body) {
    if(body.indexOf('Error Message')>-1){
      res.status(500).send('No such stock.')
    } else {
    body = JSON.parse(body);
    var data = body['Time Series (Daily)'];
    var dataArrays = [];
    var dataKeys = Object.keys(data).slice(0, 700);
    for(i = 0; i<dataKeys.length; i++){
      var dataPoint = data[dataKeys[i]]['1. open'];
      var date = moment(dataKeys[i]).valueOf()
      dataArrays.push([date, parseFloat(dataPoint)])
    }
    dataArrays = dataArrays.reverse();
    res.send({dataArrays: dataArrays, name: req.body.stock, color: getColor()});
    }
  });
});


function getColor(){
  var colors = ['#8FD400', '#8D4E85', '#9C7C38', '#0A7E8C', '#319177', '#757575', '#C46210', '#9C2542', '#0081AB']
  if(colorIterator == colors.length-1){
    colorIterator = -1;
  }
  colorIterator++
  return colors[colorIterator]
  
}

module.exports = router;
