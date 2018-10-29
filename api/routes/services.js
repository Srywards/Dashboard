const { Router } = require('express')
var weather = require('weather-js')
const ytSearch = require('yt-search')
var json = require('./../../components/MarketCode.json');
const router = Router()

router.post('/Dashboard/meteo', function (req, res) {
    if (req.body.id == "meteo") {
        var temp = '';
        if (req.body.temp == "Degree")
            temp = 'C'
        else
            temp = 'F'
        weather.find({ search: req.body.city, degreeType: temp }, function (err, result) {
            if (err)
                res.send(err);

            res.send(JSON.stringify(result, null, 2));
        });
    }
});

router.post('/Dashboard/youtube', function (req, res) {
    if (req.body.id == "youtube") {
        ytSearch(req.body.video, function (err, r) {
            if (err) throw err
            const videos = r.videos
            const firstResult = videos[0]
            res.send(JSON.stringify(firstResult));
        })
    }
});

router.post('/Dashboard/json', function (req, res) {
    if (req.body.id == "json") {
        /**
   * Init Alpha Vantage with your API key.
   *
   * @param {String} key 
   *   Your Alpha Vantage API key.
   */
        res.send(json);
    }
});

router.post('/Dashboard/Exchange', function (req, res) {
    if (req.body.id == "Exchange") {
        /**
   * Init Alpha Vantage with your API key.
   *
   * @param {String} key 
   *   Your Alpha Vantage API key.
   */
        var i = 0;
        while (json[i]) {
            if (json[i]["currency name"] == req.body.money)
                break;
            i++;
        }
        console.log(json[i]["currency code"])
        const alpha = require('alphavantage')({ key: '3P8Y2F5KSQXUAQH8  ' });
        alpha.crypto.intraday('btc', json[i]["currency code"]).then(data => {
            res.send(data["Time Series (Digital Currency Intraday)"]);
        })

    }
});
module.exports = router