const express = require('express');
const router = express.Router();
const keys = require('../config/config');
const alpha = require('alphavantage')({ key: keys.alphaKey });


/* GET home page. */

router.get('/', function(req, res, next){
  res.render('index');
})

router.post('/getstock', function(req, res, next) {
  var stock = req.body.stock;
  var keys = req.body['labels[]'];
  console.log(stock);
  alpha.data.daily(stock, 'full').then(data => {
    data = data['Time Series (Daily)'];
    var dataValues = []
    for(i = 0; i<keys.length; i++){
      var dataPoint = data[keys[i]]['1. open'];
      dataValues.push(dataPoint)
    }
    console.log(dataValues.length)
    res.send({dataValues: dataValues, name: req.body.stock});
  });
});


router.post('/getlabels', function(req, res, next) {
  var stock = req.body.stock;
  var keysArray = [];
  alpha.data.daily(stock, 'full').then(data => {
  data = data['Time Series (Daily)'];
  var dataKeys = Object.keys(data).slice(0, 700);
  res.send({dataKeys: dataKeys});
  });
});


/*

alpha.data.intraday(symbol, outputsize, datatype, interval)
alpha.data.daily(symbol, outputsize, datatype, interval)
alpha.data.daily_adjusted(symbol, outputsize, datatype, interval)
alpha.data.weekly(symbol, outputsize, datatype, interval)
alpha.data.weekly_adjusted(symbol, outputsize, datatype, interval)
alpha.data.monthly(symbol, outputsize, datatype, interval)
alpha.data.monthly_adjusted(symbol, outputsize, datatype, interval)
alpha.data.batch([symbol1, symbol2..])


Symbol:
The name of the equity of your choice. For example: symbol=MSFT

Interval: 
Time interval between two consecutive data points in the time series. The following values are supported: 1min, 5min, 15min, 30min, 

Optional: outputsize

By default, outputsize=compact. Strings compact and full are accepted with the following specifications: compact returns only the latest 100 data points in the intraday time series;
 full returns the full-length intraday time series. The "compact" option is recommended if you would like to reduce the data size of each API call.

❚ Optional: datatype

By default, datatype=json


*/


module.exports = router;
