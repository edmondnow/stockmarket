const express = require('express');
const router = express.Router();
const keys = require('../config/config');
const alpha = require('alphavantage')({ key: keys.alphaKey });





/* GET home page. */

router.get('/', function(req, res, next){
  res.render('index');
})

router.get('post', function(req, res, next) {
var stock = req.body.stock;
// Simple examples
alpha.data.monthly(stock).then(data => {
  console.log(data);
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
